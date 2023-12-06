const AFTER_ADD_VEHICLE = (target, data) => {
  target
    .querySelector('button[data-action="DELETE_VEHICLE"]')
    .setAttribute('data-maker-id', data.maker_id);
  target
    .querySelector('input[name="maker_id"]')
    .setAttribute('value', data.maker_id);
};

const AFTER_ADD_MODEL = (_, data, field) => {
  field.parentNode
    .querySelector('input[name="model_id"]')
    .setAttribute('value', data.model_id);
  field.parentNode
    .querySelector('button[data-action="DELETE_MODEL"]')
    .setAttribute('data-model-id', data.model_id);
};

const AFTER_SAVE_ACTION_CATALOG = {
  ADD_VEHICLE: AFTER_ADD_VEHICLE,
  ADD_MODEL: AFTER_ADD_MODEL,
};

const RELY_ON_MAKER = (target) => ({
  maker_id:
    Number(
      target.closest('FORM').querySelector('input[name="maker_id"]').value
    ) || null,
});

const RELY_ON_DATA_BY_ACTION_CATALOG = {
  ADD_MODEL: RELY_ON_MAKER,
};

export const VEHICLE_API = async (method = 'GET', body) => {
  const response = await fetch('api/vehicle', {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
};

export const CREATE_DOM = (config, data = {}, parentEl = null) => {
  const element = document.createElement(config.element);

  element.className = config.className || '';
  element.innerText = config.innerText || '';
  Object.entries(config.attributes || {}).forEach(([attr, value]) => {
    if (attr === 'name' && value) {
      element.value = data[value] || '';
    }
    element.setAttribute(attr, value);
  });
  (config.children || []).forEach((child) =>
    CREATE_DOM(child, data || {}, element)
  );

  if (parentEl) {
    parentEl.appendChild(element);
  }

  return element;
};

export const COMPOSE_FIELD_ATTRIBUTES = (field, attributes) => {
  return attributes.reduce((acc, attr) => {
    const key = attr.replace('data-', '');
    const value = field[attr] || field.getAttribute(attr) || null;
    return { ...acc, [key]: value };
  }, {});
};

export const RELY_ON_DATA_BY_ACTION = (target, action) => {
  return RELY_ON_DATA_BY_ACTION_CATALOG[action]
    ? RELY_ON_DATA_BY_ACTION_CATALOG[action](target)
    : () => null;
};

export const SET_FIELDS_STATUS = (fields, status) => {
  Array.from(fields).forEach((field) =>
    field.setAttribute('data-status', status)
  );
};

export const AFTER_SAVE_ACTIONS = (target, response, editedFields) => {
  target.classList.remove('pending-changes');
  response.forEach((res, index) =>
    AFTER_SAVE_ACTION_CATALOG[res.action]
      ? AFTER_SAVE_ACTION_CATALOG[res.action](target, res, editedFields[index])
      : null
  );
};
