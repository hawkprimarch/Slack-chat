import React, { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as UIActions } from '../slices/UISlice.js';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import useAuth from '../hooks/useAuth.jsx';
import toastParams from '../toastParams.js';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const data = getAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: data });
        const { channels, currentChannelId, messages } = response.data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        dispatch(UIActions.setCurrentChannelId({ currentChannelId }));
      } catch (err) {
        toast.warn(t('toast.dataFetchError'), toastParams);
      }
    };

    fetchData();
  }, []);

  const openAddChannelModal = () => {
    dispatch(UIActions.showModal({ modalType: 'addChannel' }));
  };

  return (
    <Container className="my-4 h-100 shadow overflow-hidden rounded shadow">
      <Row className="h-100 flex-md-row">
        <Col sm={4} md={2} className="px-2 pt-5 bg-light border-end">
          <div className="d-flex justify-content-between mb-2 ps-3 pe-2">
            <span>{t('channels')}</span>
            <button className="p-0 text-primary btn btn-group-vertical" type="button" onClick={() => openAddChannelModal()}>
              <ion-icon size="small" name="add-outline" />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels />
        </Col>
        <Col className="px-0 h-100">
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
