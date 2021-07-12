import React, { useRef, useState } from 'react';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { useFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import SubmitButton from './Buttons/SubmitButton';
import { updateRecipePage } from '../../actions';


export function RecipeEditor(props) {
  const { initialValue, docId, updateRecipePage } = props;
  const firestore = useFirestore();

  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const editorRef = useRef(null);

  const onSubmit = async () => {
    //Assigns and sanitizes editor content to data
    const data = { data: sanitizeHtml(editorRef.current.getContent()) };

    //If the value is unchanged return
    if (initialValue.data === data) return;

    //If we are already submitting return
    if (loading === true) return;

    const response = await updateRecipePage({data, docId}, setLoading, setSubmitSuccess, setSubmitError)
  };

  return (
    <div className='card bottom grid p-4'>
      <TinyMCE
        apiKey='xvjvv8pyslwcpb2549yeqxd396emzbj86fbqpkc6wy45b89v'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue ? initialValue.data:null}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <SubmitButton 
        className='btn flex justify-center mt-4' 
        btnColor='primary' 
        loading={loading} 
        submitSuccess={submitSuccess} 
        setSubmitSuccess={setSubmitSuccess}
        submitError={submitError} 
        onClickHandler={onSubmit} 
        />
    </div>
  );
};

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  updateRecipePage
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditor)