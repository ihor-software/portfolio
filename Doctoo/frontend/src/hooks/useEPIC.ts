import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchUserThunk, setCurrentUser } from 'src/store/slices/auth';
import { getPhone } from 'src/utils/epicUtils';
import { useAppSelector } from './redux';
import { updatePatientThunk } from 'src/store/slices/patient';

export const useEpic = () => {
  const user = useAppSelector(state => state.auth.currentUser);
  const [accessToken, setAccessToken] = useState<string>('');
  const [patient, setPatient] = useState<string>('');
  const dispatch = useDispatch();

  const clientId = 'f3d3ec23-a386-4bd9-b56a-f90d56c9f4b7';
  const redirect = 'https://doctoo.org/dashboard';

  useEffect(() => {
    const queryCode = new URLSearchParams(window.location.search).get('code');
    if (queryCode) {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', redirect);
      params.append('code', queryCode);
      params.append('client_id', clientId);
      params.append('state', '1234');
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      axios
        .post('https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token', params, config)
        .then(response => {
          setAccessToken(response.data.access_token);
          setPatient(response.data.patient);
        })
        .catch(function (error) {});
    }
  }, []);

  useEffect(() => {
    if (accessToken !== '' && patient !== '') {
      axios
        .get(`https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/${patient}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          const updatedUser = {
            first_name: Array.isArray(response.data.name[0].given)
              ? response.data.name[0].given.join(' ')
              : response.data.name[0].given,
            last_name: response.data.name[0].family,
            email: user?.email,
            gender_cd: response.data.gender,
            phone_number: getPhone(response.data.telecom)
              ? '+38' + getPhone(response.data.telecom).replace(/-/g, '')
              : user?.phone_number,
          };
          dispatch(
            setCurrentUser({ user: { ...updatedUser, id: user?.id ? user.id : 0, avatar: '' } }),
          );
          dispatch(updatePatientThunk({ height: 178, weight: 60 }));
          dispatch(patchUserThunk(updatedUser));
        })
        .catch(error => {});
    }
  }, [accessToken, patient]);
};
