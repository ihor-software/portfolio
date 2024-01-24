import { Controller, Body, Post, Get, Res } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { PdfService } from './pdf.service';
import { AppointmentSummaryDto } from './dto/appointment-summary.dto';
import { AppointmentService } from 'src/appointment';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { UpdateAppointmentDto } from 'src/appointment';

@ApiTags('Pdf')
@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly appointmentService: AppointmentService,
  ) {}

  @ApiOkResponse({ description: '' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('appointment-summary')
  async getPdfSummary(
    @Body() appointmentSummaryDto: AppointmentSummaryDto,
    @Res() res,
  ): Promise<void> {
    const appointment = await this.appointmentService.findOne(appointmentSummaryDto.appointment_id);
    const buffer = await this.pdfService.generateAppointmentSummary({
      ...appointmentSummaryDto,
      appointment,
    });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename-example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);

    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'summary/' + appointmentSummaryDto.appointment_id + '.pdf',
      Body: buffer,
      ACL: 'public-read',
    };
    try {
      s3Client.send(new PutObjectCommand(params));
      const pdfUrl = `https://${params.Bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${params.Key}`;
      const appointmentUpdateDto: UpdateAppointmentDto = {
        summary: pdfUrl,
        ...appointment,
      };
      await this.appointmentService.update(
        appointmentSummaryDto.appointment_id,
        appointmentUpdateDto,
      );
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
