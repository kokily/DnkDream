import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import oc from 'open-color';
import TextareaAutoSize from 'react-textarea-autosize';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { media, shadow } from 'styles';
import ActionButtonContainer from 'containers/write/ActionButtonContainer';

interface WriteProps {
  title: string;
  body: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeEditor: (e, editor: any) => void;
}

const Write: React.FC<WriteProps> = ({
  title,
  body,
  onChangeTitle,
  onChangeEditor,
}) => {
  return (
    <>
      <PageStyle />

      <TitleTextPane
        placeholder="제목을 입력해용"
        value={title}
        onChange={onChangeTitle}
      />
      <EditorPane>
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onChange={onChangeEditor}
          config={{
            ckfinder: {
              uploadUrl: 'http://localhost:4000/api/uploads',
            },
          }}
        />
      </EditorPane>

      <ActionButtonContainer title={title} body={body} />
    </>
  );
};

export default Write;

// Style
const PageStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  box-sizing: border-box;
  margin: 1rem;
}
*, *:before, *:after {
  box-sizing: inherit;
}
a {
  text-decoration: none;
}
`;

const style = css`
  display: block;
  padding: 0;
  margin-bottom: 2rem;
  font-size: 2.75rem;
  ${media.tablet} {
    font-size: 1.8rem;
  }
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: ${oc.gray[9]};
  &::placeholder {
    color: ${oc.gray[5]};
  }
`;

const TitleTextPane = styled(TextareaAutoSize)`
  ${style}
`;

const EditorPane = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
  ${shadow(1)};
  .ck {
    border: 0;
  }
  .ql-editor {
    min-height: 350px;
  }
  .ck-content {
    background: ${oc.cyan[4]};
  }
`;
