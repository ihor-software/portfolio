import { HttpStatus } from '@nestjs/common';
import { SummarizationRequestDto } from './dto/summarization-request.dto';
import googleCloudHealthcareNlpApiPrivateKey from './utils/apiPrivateKey';
import axios from 'axios';
import { google } from 'googleapis';

export class SummarizationService {
  async analyzeEntities(summarizationRequestDto: SummarizationRequestDto) {
    const jwtClient = new google.auth.JWT(
      googleCloudHealthcareNlpApiPrivateKey.client_email,
      null,
      googleCloudHealthcareNlpApiPrivateKey.private_key,
      ['https://www.googleapis.com/auth/cloud-healthcare'],
    );

    const accessToken = (await jwtClient.getAccessToken()).token;

    const data = JSON.stringify(summarizationRequestDto);
    const response = await axios.post(
      `https://healthcare.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_HEALTHCARE_NLP_API_PROJECT_ID}/locations/${process.env.GOOGLE_CLOUD_HEALTHCARE_NLP_API_REGION}/services/nlp:analyzeEntities`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === HttpStatus.OK) {
      const data = response.data;
      const map = {};

      data.entityMentions.forEach(mention => {
        map[mention.type] = map[mention.type] ? [...map[mention.type], mention] : [mention];
      });

      return {
        entityMentionsTypesMap: map,
        entityMentions: data.entityMentions,
      };
    }
  }
}
