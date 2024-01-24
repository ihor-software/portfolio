import { Appointment } from 'src/appointment';
import { AppointmentSummaryDto } from './dto/appointment-summary.dto';
import { getMedicineInfo } from './utils/appointment-summary.utils';

const PDFDocument = require('pdfkit');

export class PdfService {
  async generateAppointmentSummary(
    data: AppointmentSummaryDto & { appointment: Appointment },
  ): Promise<Buffer> {
    return await new Promise(resolve => {
      const doc = new PDFDocument({
        bufferPages: true,
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });

      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text(`Appointment summary`, { align: 'center' })
        .font('Helvetica')
        .fontSize(14)
        .moveDown()
        .font('Helvetica-Bold')
        .text('Doctor: ', { continued: true, lineGap: 5 })
        .font('Helvetica')
        .text(
          `${data.appointment.doctor.user.first_name} ${data.appointment.doctor.user.last_name} (${data.appointment.doctor.specialty.specialty})`,
        )
        .font('Helvetica-Bold')
        .text('Patient: ', { continued: true, lineGap: 5 })
        .font('Helvetica')
        .text(
          `${data.appointment.patient.user.first_name} ${data.appointment.patient.user.last_name}`,
        )
        .font('Helvetica-Bold')
        .text('Date and time: ', { continued: true, lineGap: 5 })
        .font('Helvetica')
        .text(data.appointment.date_time.toLocaleString())
        .moveDown()
        .font('Helvetica-Bold')
        .text(`Doctor note: `, { lineGap: 10 })
        .font('Helvetica');

      let lastEntityOffset = 0;
      data.summary.entityMentions?.forEach((entity: any) => {
        const currentRenderedText = data.doctorNote.slice(
          lastEntityOffset,
          entity.text.beginOffset,
        );
        lastEntityOffset = entity.text.beginOffset + entity.text.content.length;

        doc
          .text(currentRenderedText, {
            lineGap: 2,
            continued: true,
            underline: false,
          })
          .fillColor('grey')
          .text(entity.text.content, {
            lineGap: 2,
            continued: true,
            underline: true,
          })
          .fillColor('black');
      });

      doc
        .text(data.doctorNote.slice(lastEntityOffset, data.doctorNote.length), {
          lineGap: 2,
          underline: false,
        })
        .moveDown()
        .font('Helvetica-Bold')
        .text(`Conclusion: `, { lineGap: 10 })
        .font('Helvetica');

      const problems = data.summary.entityMentionsTypesMap?.PROBLEM?.filter(
        entity => !entity.text.content.toLowerCase().includes('symptom'),
      );

      if (problems?.length) {
        doc
          .font('Helvetica-Oblique')
          .text('Chief complaints: ', { lineGap: 5, underline: true })
          .font('Helvetica')
          .text('During the appointment, the following patient complaints were identified: ', {
            lineGap: 5,
          })
          .fillColor('red')
          .text(problems.map(entity => `${entity.text.content.toLowerCase()}`).join(', '))
          .fillColor('black')
          .moveDown();
      }

      const problematicBodyParts = data.summary.entityMentionsTypesMap?.ANATOMICAL_STRUCTURE;

      if (problematicBodyParts?.length) {
        doc
          .font('Helvetica-Oblique')
          .text('Problematic body parts: ', { lineGap: 5, underline: true })
          .font('Helvetica')
          .text('A list of body parts that may have problems:', { lineGap: 5 })
          .fillColor('red')
          .text(
            problematicBodyParts.map(entity => `${entity.text.content.toLowerCase()}`).join(', '),
          )
          .fillColor('black')
          .moveDown();
      }

      const medicine = data.summary.entityMentionsTypesMap?.MEDICINE?.map(entity => ({
        ...entity,
        medicineInfo: getMedicineInfo(entity, data.doctorNote, data.summary),
      })).filter(entity => !entity.medicineInfo.name.includes('medication'));

      if (medicine?.length) {
        doc
          .font('Helvetica-Oblique')
          .text('Treatment: ', { lineGap: 5, underline: true })
          .font('Helvetica')
          .text('The doctor suggests the following treatment: ', { lineGap: 5 })
          .fillColor('green')
          .list(
            medicine.map(
              (entity: any) =>
                `-${entity.medicineInfo.dose ? ` ${entity.medicineInfo.dose}` : ``}${
                  entity.medicineInfo.strength ? ` ${entity.medicineInfo.strength}` : ``
                }${entity.medicineInfo.form ? ` ${entity.medicineInfo.form} of` : ``}${
                  entity.medicineInfo.unit ? ` ${entity.medicineInfo.unit} of` : ``
                }${entity.medicineInfo.name ? ` ${entity.medicineInfo.name}` : ``}${
                  entity.medicineInfo.frequency ? `, ${entity.medicineInfo.frequency}` : ``
                }`,
            ),
            {
              textIndent: 5,
              listType: 'none',
            },
          )
          .fillColor('black')
          .moveDown();
      }

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });

      doc.end();
    });
  }
}
