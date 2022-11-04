import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useAuth from '../hooks/useAuth.jsx';
import useChatApi from '../hooks/useChatApi';

const NewMessages = (props) => {
  const { currentChannelId } = props;
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const { getUsername } = useAuth();
  const { createNewChatMessage } = useChatApi();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length <= 0) {
      return;
    }
    const data = {
      body: message,
      channelId: currentChannelId,
      username: getUsername(),
    };
    createNewChatMessage(data);
    setMessage('');
  };

  console.log(currentChannelId);

  const btnClass = message.length <= 0 ? 'btn btn-group-vertical disabled' : 'btn btn-group-vertical';

  return (
    <div className="mt-auto px-5 py-2">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Label htmlFor="body" visuallyHidden="false">{t('new_message')}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder={t('enter_message')}
            aria-label={t('new_message')}
            value={message}
            onChange={handleChange}
            ref={inputRef}
            name="body"
            id="body"
          />
          <Button variant="outline-secondary" className={btnClass} type="submit" style={{ alignItems: 'center', outline: 'none' }}>
            <ion-icon size="small" name="arrow-forward-outline" />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessages;
