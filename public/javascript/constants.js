export const PAGE_CONTENT_EL = document.querySelector('div.content');
export const DIALOG_EL = document.querySelector('DIALOG');
export const FORM_DIALOG_EL = DIALOG_EL.querySelector('form');

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const FIELD_STATUS = {
  PRISTINE: 'PRISTINE',
  EDITED: 'EDITED',
};

export const ADD_VEHICLE_DOM_CONFIG = {
  element: 'FORM',
  className: 'vehicle-container',
  children: [
    {
      element: 'BUTTON',
      className: 'icon-btn floating-btn',
      attributes: {
        title: 'DELETE VEHICLE',
        type: 'button',
        'data-action': 'DELETE_VEHICLE',
      },
      children: [
        {
          element: 'IMG',
          attributes: {
            src: '/images/icons/delete.svg',
            alt: 'DELETE VEHICLE',
          },
        },
      ],
    },
    {
      element: 'DIV',
      className: 'vehicle-section',
      children: [
        {
          element: 'DIV',
          className: 'vehicle-sub-section',
          children: [
            {
              element: 'INPUT',
              className: 'hidden',
              attributes: {
                name: 'maker_id',
                'data-status': 'PRISTINE',
              },
            },
            {
              element: 'LABEL',
              className: 'required',
              innerText: 'Brand Name',
            },
            {
              element: 'INPUT',
              attributes: {
                required: true,
                placeholder: 'Add Brand Name...',
                name: 'maker',
                autocomplete: 'off',
                'data-status': 'PRISTINE',
                'data-action': 'ADD_VEHICLE',
              },
            },
          ],
        },
      ],
    },
    {
      element: 'FIELDSET',
      className: 'vehicle-section',
      children: [
        {
          element: 'DIV',
          className: 'vehicle-sub-section row-gap scroll-x',
          children: [
            {
              element: 'LEGEND',
              innerText: 'Model List',
              className: 'required sticky-top',
            },
            {
              element: 'BUTTON',
              className: 'add-section sticky-bottom',
              attributes: {
                type: 'button',
                'data-action': 'ADD_MODEL',
              },
              children: [
                {
                  element: 'IMG',
                  attributes: {
                    src: '/images/icons/add.svg',
                    alt: 'Add Model',
                  },
                },
                {
                  element: 'P',
                  innerText: 'ADD MODEL',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      element: 'BUTTON',
      className: 'save-changes',
      innerText: 'SAVE CHANGES',
      attributes: {
        type: 'submit',
      },
    },
  ],
};

export const ADD_MODEL_DOM_CONFIG = {
  element: 'DIV',
  className: 'vehicle-sub-section flex-row',
  children: [
    {
      element: 'INPUT',
      className: 'hidden',
      attributes: {
        readonly: true,
        name: 'model_id',
      },
    },
    {
      element: 'INPUT',
      attributes: {
        required: true,
        name: 'model',
        autocomplete: 'off',
        placeholder: 'Add Model Name...',
        'data-action': 'ADD_MODEL',
      },
    },
    {
      element: 'BUTTON',
      className: 'icon-btn',
      attributes: {
        title: 'DELETE MODEL',
        type: 'button',
        'data-action': 'DELETE_MODEL',
      },
      children: [
        {
          element: 'IMG',
          attributes: {
            src: '/images/icons/delete-CIRCLE.svg',
            alt: 'DELETE MODEL',
          },
        },
      ],
    },
  ],
};

export const INSERT_SPECS_DOM_CONFIG = {
  element: 'DIV',
  className: 'card read-mode',
  children: [
    {
      element: 'BUTTON',
      className: 'event-trigger',
      attributes: {
        title: 'EDIT SPEC',
        type: 'button',
        'data-action': 'EDIT_SPECS',
      },
    },
    {
      element: 'BUTTON',
      className: 'event-trigger',
      attributes: {
        title: 'DELETE SPEC',
        type: 'button',
        'data-action': 'DELETE_SPEC',
      },
    },
    {
      element: 'label',
      innerText: 'Chassis Model',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_id',
      },
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_chassis',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Production From',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_from',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Production To',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_to',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Engine Model',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_engine',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Engine Power',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_power',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Engine Torque',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_torque',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Transmission Model',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_transmission',
        readonly: true,
      },
    },
    {
      element: 'label',
      innerText: 'Transmission Type',
    },
    {
      element: 'input',
      className: 'hidden',
      attributes: {
        name: 'spec_transmission_type',
        readonly: true,
      },
    },
  ],
};
