/*eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, TextField } from '@mui/material';
// import PropTypes from 'prop-types';
import { ProfileRow, Line, ButtonComp } from '../../../Components/UI/ui-components';

const data = {
  name: 'Indrajit Sadhukhan',
  university_id: '510518043',
  contact_no: '9999999999',
  email: '510518043.indrajit@students.iiests.ac.in',
  additional_info: [
    { fieldKey: 'Year of Admission', fieldValue: '2018' },
    { fieldKey: 'Programme enrolled', fieldValue: 'BTech' },
  ],
};
function saveAbout() {
  console.log('Save About');
}
function saveContact() {
  console.log('Save Contact');
}
function saveAdditional() {
  console.log('Save Additional');
}

function changeTextField(textId, newTextFieldId, newLabel) {
  // Change Text to TextField
  const textField = (
    <TextField id={newTextFieldId} label={newLabel} variant="standard" />
  );

  ReactDOM.render(
    textField,
    document.getElementById(textId),
  );
}

function changeButton(buttonId, newButtonId, buttonText, func) {
// Change Edit button to Save button
  const saveButton = (
    <div>
      <ButtonComp
        className="save-button"
        id={newButtonId}
        text={buttonText}
        onClick={() => {
          func();
        }}
      />
    </div>
  );

  ReactDOM.render(
    saveButton,
    document.getElementById(buttonId),
  );
}

export default function Profile() {
  return (
    <Grid container spacing={2}>
      <div className="wrapper">
        <div className="section">
          <div className="section-header">
            <p><b>About</b></p>
            <div id="edit-about-button-id">
              <ButtonComp
                className="edit-button"
                text="Edit"
                onClick={() => {
                  changeButton('edit-about-button-id', 'save-about-button-id', 'Save', saveAbout);
                  changeTextField('name-id', 'Name');
                  changeTextField('university-id', 'University-ID');
                }}
              />
            </div>
          </div>
          <Line />
          <div className="section-details">
            <div className="section-items">
              <p className="section-items-head">Name</p>
              <p className="section-items-details" id="name-id">{data.name}</p>
            </div>
            <div className="section-items">
              <p className="section-items-head">University ID</p>
              <p className="section-items-details" id="university-id">{data.university_id}</p>
            </div>

          </div>
        </div>

        <div className="section">
          <div className="section-header">

            <p><b>Contact Details</b></p>
            <div id="edit-contact-button-id">
              <ButtonComp
                className="edit-button"
                text="Edit"
                onClick={() => {
                  changeButton('edit-contact-button-id', 'save-contact-button-id', 'Save', saveContact);
                  changeTextField('contact-id', 'Contact no.');
                  changeTextField('email-id', 'Email');
                }}
              />
            </div>
          </div>
          <Line />
          <div className="section-details">
            <div className="section-items">
              <p className="section-items-head">Contact no.</p>
              <p className="section-items-details" id="contact-id">{data.contact_no}</p>
            </div>
            <div className="section-items">
              <p className="section-items-head">Email</p>
              <p className="section-items-details" id="email-id">{data.email}</p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">

            <p><b>Additional Details</b></p>
            <div id="edit-additional-button-id">
              <ButtonComp
                className="edit-button"
                text="Edit"
                onClick={() => {
                  changeButton('edit-additional-button-id', 'save-additional-button-id', 'Save', saveAdditional);
                // changeTextField('contact-id','Contact no.')
                // changeTextField('email-id','Email')
                }}
              />
            </div>
          </div>
          <Line />
          <div className="section-details">
            {data.additional_info.map((item) => (
              <ProfileRow {...item} />
            ))}
          </div>
        </div>
      </div>
    </Grid>
  );
}
