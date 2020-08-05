import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

type AutoSizeInputType = {
  label: string;
  defaultValue?: string;
  r: any;
};

const AutoSizeInput: React.FC<AutoSizeInputType> = ({
  label,
  defaultValue,
  r,
}) => {
  const [text, setText] = useState<string>(defaultValue || '');
  const [focus, setFocus] = useState<boolean>(false);

  const changeTextArea = (event: any) => {
    setText(event.target.value);
  };

  const focusTextArea = (event: any) => {
    setFocus(true);
  };

  const dropFocus = (event: any) => {
    if (event.key === 'Escape') {
      setFocus(false);
      r.current.blur();
    }
  };

  const revertText = (event: any) => {
    let value = event.target.value;
    event.target.value = '';
    event.target.value = value;
  };

  const blurTextArea = () => {
    setFocus(false);
  };

  type TextAreaProps = {
    fontSize: string;
    borderbottom: string;
  };

  const TextArea = styled(TextareaAutosize)<TextAreaProps>(
    {
      resize: 'none',
      border: 'none',
      color: '#fdfdfd',
      outline: 'none',
      background: 'none',
      paddingBottom: '5px',
      display: 'block',
    },
    (props) => ({
      fontSize: props.fontSize,
      borderBottom: props.borderbottom,
    })
  );

  const [animatedLabel, setAnimatedLabel] = useSpring(() => ({
    config: { duration: 150 },
    fontSize: '22px',
    cursor: 'text',
    color: '#79797f',
    top: '0',
  }));

  useEffect(() => {
    if (focus || text.length !== 0) {
      setAnimatedLabel({
        fontSize: '14px',
        cursor: 'default',
        color: '#4c4d55',
        top: '40px',
      });
    } else {
      setAnimatedLabel({
        fontSize: '22px',
        cursor: 'text',
        color: '#79797f',
      });
      r.current.style.position = 'absolute';
    }
  }, [focus, setAnimatedLabel, text.length, r]);

  useEffect(() => {
    document.addEventListener('keydown', dropFocus, false);
  }, []);

  return (
    <>
      <TextArea
        tabIndex={Date.now()}
        onChange={changeTextArea}
        onFocus={revertText}
        onClick={focusTextArea}
        onBlur={blurTextArea}
        value={text}
        ref={r}
        autoFocus
        fontSize={text.length >= 39 ? '14px' : '22px'}
        borderbottom={focus ? '1px solid #fdfdfd' : '1px solid #79797f'}
      />
      <animated.label style={animatedLabel}>{label}</animated.label>
    </>
  );
};

export { AutoSizeInput };
