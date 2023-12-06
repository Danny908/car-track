import {
  ADD_VEHICLE_DOM_CONFIG,
  PAGE_CONTENT_EL,
  API_METHODS,
  FIELD_STATUS,
  ADD_MODEL_DOM_CONFIG,
  DIALOG_EL,
  FORM_DIALOG_EL,
  INSERT_SPECS_DOM_CONFIG,
} from './constants.js';
import {
  AFTER_SAVE_ACTIONS,
  CREATE_DOM,
  COMPOSE_FIELD_ATTRIBUTES,
  SET_FIELDS_STATUS,
  VEHICLE_API,
  RELY_ON_DATA_BY_ACTION,
} from './helpers.js';

// * ╔═╗╦ ╦╔╗╔╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
// * ╠╣ ║ ║║║║║   ║ ║║ ║║║║╚═╗
// * ╚  ╚═╝╝╚╝╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

async function deleteVehicle(target) {
  const formEl = target.closest('FORM');
  const maker_id = target.getAttribute('data-maker-id');
  const action = target.getAttribute('data-action');
  if (maker_id) {
    formEl.classList.add('loading');
    const [_, error] = await VEHICLE_API(API_METHODS.DELETE, {
      maker_id,
      action,
    });

    if (error) {
      window.alert(error.message);
    }
    formEl.classList.remove('loading');
  }
  formEl.remove();
}

async function deleteModel(target) {
  const formEl = target.closest('FORM');
  const model_id = target.getAttribute('data-model-id');
  const action = target.getAttribute('data-action');
  if (model_id) {
    formEl.classList.add('loading');
    const [_, error] = await VEHICLE_API(API_METHODS.DELETE, {
      model_id,
      action,
    });

    if (error) {
      window.alert(error.message);
    }
    formEl.classList.remove('loading');
  }
  target.parentNode.remove();
}

async function saveChanges({ target }) {
  const editedFields = target.querySelectorAll(
    `input[data-status="${FIELD_STATUS.EDITED}"]`
  );
  const payload = Array.from(editedFields).reduce((acc, field) => {
    const { action, name, value } = COMPOSE_FIELD_ATTRIBUTES(field, [
      'data-action',
      'name',
      'value',
    ]);

    const { name: idName, value: idValue } = COMPOSE_FIELD_ATTRIBUTES(
      field.parentNode.querySelector('input.hidden'),
      ['name', 'value']
    );

    const relyOn = RELY_ON_DATA_BY_ACTION(target, action);

    return [
      ...acc,
      {
        action,
        [name]: value,
        [idName]: idValue,
        ...relyOn,
      },
    ];
  }, []);

  const [res, error] = await VEHICLE_API(API_METHODS.POST, payload);

  if (error) {
    window.alert(error.message);
  }
  SET_FIELDS_STATUS(editedFields, FIELD_STATUS.PRISTINE);
  AFTER_SAVE_ACTIONS(target, res, Array.from(editedFields));
}

function addElement(config, parent, sibling) {
  const element = CREATE_DOM(config);
  parent.insertBefore(element, sibling);
  parent.scrollTop = parent.scrollHeight;
  element.focus();
}

function openSpecsModal(target, action) {
  document.body.className = 'modal-open';
  DIALOG_EL.showModal();
}

function insertSpec(target) {
  const specsEl = Array.from(target.querySelectorAll('input, select'));
  const data = specsEl.reduce((acc, input) => {
    const key = input.getAttribute('name');
    const value = input.value;

    return { ...acc, [key]: value };
  }, {});

  const element = CREATE_DOM(INSERT_SPECS_DOM_CONFIG, data);
  document.querySelector('div.specs-container[]');
}

// * ╦  ╦╔═╗╔╦╗╔═╗╔╗╔╔═╗╦═╗╔═╗
// * ║  ║╚═╗ ║ ║╣ ║║║║╣ ╠╦╝╚═╗
// * ╩═╝╩╚═╝ ╩ ╚═╝╝╚╝╚═╝╩╚═╚═╝

PAGE_CONTENT_EL.addEventListener('click', ({ target }) => {
  if (target.tagName === 'BUTTON') {
    if (target.getAttribute('data-action') === 'ADD_VEHICLE') {
      // * Delegate Add Vehicle Listener...
      addElement(ADD_VEHICLE_DOM_CONFIG, PAGE_CONTENT_EL, target);
    }
    // * Delegate Add Model Listener...
    if (target.getAttribute('data-action') === 'ADD_MODEL') {
      const parent = target.closest('div.vehicle-sub-section');
      addElement(ADD_MODEL_DOM_CONFIG, parent, target);
    }
    // * Delegate Add/Edit Specs Listener...
    if (
      target.getAttribute('data-action') === 'ADD_SPECS' ||
      target.getAttribute('data-action') === 'EDIT_SPECS'
    ) {
      openSpecsModal(target);
    }
    // * Delegate Close Dialog Listener...
    if (target.getAttribute('data-action') === 'CLOSE_DIALOG') {
      document.body.className = '';
      DIALOG_EL.close();
      FORM_DIALOG_EL.reset();
      FORM_DIALOG_EL.classList.remove('pending-changes');
    }
    // * Delegated Delete Vehicle Listener...
    if (target.getAttribute('data-action') === 'DELETE_VEHICLE') {
      deleteVehicle(target);
    }
    // * Delegated Delete Model Listener...
    if (target.getAttribute('data-action') === 'DELETE_MODEL') {
      deleteModel(target.parentNode);
    }
  }

  if (target.tagName === 'INPUT') {
    // * Display Model Specs...
    if (target.getAttribute('data-action') === 'EDIT_MODEL') {
      const container = target
        .closest('FIELDSET')
        .querySelector('div.model-container');
      const specsEl = target
        .closest('FIELDSET')
        .querySelector('div.specs-container');

      // * Remove class from previous active inputs in the same container...
      Array.from(container.querySelectorAll('.active-input') || []).forEach(
        (input) => (input.className = '')
      );

      // * Add model id as identifier to specs container...
      const modelId = target.parentNode.querySelector(
        'input[name=model_id]'
      ).value;
      specsEl.setAttribute('id', modelId);

      target.classList.add('active-input');
      specsEl.classList.remove('hidden');
    }
  }
});

PAGE_CONTENT_EL.addEventListener('dblclick', ({ target }) => {
  // * Delegated Enable Edit Mode Listener...
  if (target.tagName === 'INPUT' && target.readOnly) {
    target.removeAttribute('readOnly');
    target.focus();
  }
});

PAGE_CONTENT_EL.addEventListener('focusout', ({ target }) => {
  // * Delegated Disable Edit Mode Listener...
  if (target.tagName === 'INPUT' && !target.readOnly) {
    // target.setAttribute('readOnly', true);
  }
});

PAGE_CONTENT_EL.addEventListener('input', ({ target }) => {
  // * Mark Input As Edited...
  target.setAttribute('data-status', FIELD_STATUS.EDITED);
  // * Enable Save Changes Button...
  target.closest('FORM').classList.add('pending-changes');
});

// * Save Changes...
PAGE_CONTENT_EL.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.getAttribute('data-action') === 'SAVE_CHANGES') {
    saveChanges(event);
  }
  if (event.target.getAttribute('data-action') === 'INSERT_SPEC') {
    insertSpec(event.target);
  }
  return false;
});
