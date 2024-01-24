import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostMesageDto } from './dto/postMessageDto';
import OpenAI from 'openai';
import { DoctorService, Specialty } from 'src/doctor';
import { AppointmentService } from 'src/appointment/appointment.service';
import { SpecialtyService } from 'src/doctor/specialty/specialty.service';
import { VirtualAssistantChatMessage } from './entities/chat-message.entity';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

@Injectable()
export class VirtualAssistantService {
  private configurationMessage: string;
  private doctorSpecialties: Specialty[];
  private readonly openai: OpenAI;
  private readonly doctorsInjectionMarker: string = `{###AVAILABLE_DOCTORS_LIST['<requested speciality>']###}`;
  private readonly appointmentsInjectionMarker: string = `{###NEAREST_APPOINTMENTS_LIST###}`;

  constructor(
    @InjectModel(VirtualAssistantChatMessage)
    private virtualAssistantChatMessageRepository: typeof VirtualAssistantChatMessage,
    private readonly doctorService: DoctorService,
    private readonly appointmentService: AppointmentService,
    private readonly specialtyService: SpecialtyService,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getVirtualAssistantResponse(userId: number, postMessageDto: PostMesageDto) {
    this.doctorSpecialties = await this.specialtyService.findAll();
    this.configurationMessage = `You are a virtual assistant in an online clinic. You have to answer greetings and only those 
                                 questions that are related to medicine and our online clinic.
                                 - If you will be asked to show the list of available doctors you MUST do the next steps:
                                     1. understand which doctor user needs, choose ONLY ONE specialty related to this doctor from the list ${JSON.stringify(
                                       this.doctorSpecialties,
                                     )}
                                     2. you MUST write the response only in this format ${
                                       this.doctorsInjectionMarker
                                     } and not in any other 
                                     3. you MUST NOT to write any additional text to this response
                                     4. even if you are asked the same or similar question a lot of times you MUST write response exactly in this format
                                 - If you will be asked for appointments, you MUST do the next steps:
                                     1. provide a list of the 4 nearest appointments in this format ${
                                       this.appointmentsInjectionMarker
                                     }
                                     2. ensure the list of appointments is in a well-formatted manner`;

    await this.virtualAssistantChatMessageRepository.create({
      user_id: userId.toString(),
      role: 'user',
      message: postMessageDto.message,
      isVisible: true,
      containsDoctorsList: false,
      containsAppointmentsList: false,
    });

    const userMessages = (
      await this.virtualAssistantChatMessageRepository.findAll({
        where: {
          user_id: userId.toString(),
        },
      })
    ).map(
      message => ({ role: message.role, content: message.message } as ChatCompletionMessageParam),
    );

    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: this.configurationMessage }, ...userMessages],
      model: process.env.OPENAI_API_MODEL,
    });

    if (response.choices[0].message.content.includes('AVAILABLE_DOCTORS_LIST')) {
      const specialty = this.doctorSpecialties
        .find(specialty => response.choices[0].message.content.includes(specialty.get('specialty')))
        ?.get('specialty');

      let message = `Sure! Here is the list of available doctors with specialty '${specialty}' which can help you with your problems: `;

      if (!specialty) {
        message = 'Could you please specify which doctor you need?';
      }

      await this.virtualAssistantChatMessageRepository.create({
        user_id: userId.toString(),
        role: 'assistant',
        message: message,
        isVisible: true,
        containsDoctorsList: true,
        containsAppointmentsList: false,
      });

      return {
        message: message,
        available_doctors: await this.doctorService.findAllAvailableDoctorsBySpecialty(specialty),
      };
    } else if (response.choices[0].message.content.includes('NEAREST_APPOINTMENTS_LIST')) {
      const nearestAppointments = await this.appointmentService.findUpcomingAppointmentsByPatient(
        userId,
      );

      let message =
        nearestAppointments.length > 0
          ? 'Here is the list of the nearest appointments: '
          : 'You have no appointments yet.';

      if (nearestAppointments.length === 0) {
        message = "I'm sorry, there are no appointments available at the moment.";
      }

      await this.virtualAssistantChatMessageRepository.create({
        user_id: userId.toString(),
        role: 'assistant',
        message: message,
        isVisible: true,
        containsDoctorsList: false,
        containsAppointmentsList: true,
      });

      return { message: message, nearest_appointments: nearestAppointments };
    } else {
      await this.virtualAssistantChatMessageRepository.create({
        user_id: userId.toString(),
        role: 'assistant',
        message: response.choices[0].message.content,
        isVisible: true,
        containsDoctorsList: false,
        containsAppointmentsList: false,
      });

      return { message: response.choices[0].message.content };
    }
  }

  async getChatMessages(userId: number) {
    return await this.virtualAssistantChatMessageRepository.findAll({
      where: {
        user_id: userId.toString(),
      },
    });
  }

  async clearConversation(userId: number) {
    return await this.virtualAssistantChatMessageRepository.destroy({
      where: {
        user_id: userId.toString(),
      },
    });
  }
}
