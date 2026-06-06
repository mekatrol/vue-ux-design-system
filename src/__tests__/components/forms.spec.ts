import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import {
  AppForm,
  FormChoiceList,
  FormField,
  FormGrid,
  FormGroup,
  FormSection,
  FormSelect,
  type FormOption
} from '@/components/forms';

const sampleOptions: readonly FormOption[] = [
  { key: 'alpha', displayValue: 'Alpha', hint: 'First option' },
  { key: 'bravo', displayValue: 'Bravo' },
  { key: 'charlie', displayValue: 'Charlie', disabled: true }
] as const;

describe('form components', () => {
  it('renders the app form shell and forwards form attributes', () => {
    const wrapper = mount(AppForm, {
      attrs: {
        'aria-label': 'Example form'
      },
      slots: {
        default: '<button type="submit">Submit</button>'
      }
    });

    expect(wrapper.get('form').classes()).toContain('form-panel');
    expect(wrapper.get('form').attributes('aria-label')).toBe('Example form');
    expect(wrapper.get('button').text()).toBe('Submit');
  });

  it('renders a form section with a title, optional description, and inherited attrs', () => {
    const wrapper = mount(FormSection, {
      props: {
        title: 'Applicant details',
        description: 'Use sample data only.'
      },
      attrs: {
        id: 'applicant'
      },
      slots: {
        default: '<p>Section body</p>'
      }
    });

    expect(wrapper.get('section').classes()).toContain('form-section');
    expect(wrapper.get('section').attributes('id')).toBe('applicant');
    expect(wrapper.get('.form-section__title').text()).toBe('Applicant details');
    expect(wrapper.get('.form-section__text').text()).toBe('Use sample data only.');
    expect(wrapper.text()).toContain('Section body');
  });

  it('renders a form group as a fieldset with legend variants and merged classes', () => {
    const wrapper = mount(FormGroup, {
      props: {
        legend: 'Ready checklist',
        hint: 'Select all that apply.',
        titleVariant: true
      },
      attrs: {
        class: 'document-checklist'
      },
      slots: {
        default: '<input type="checkbox" value="ready" />'
      }
    });

    expect(wrapper.get('fieldset').classes()).toEqual(
      expect.arrayContaining(['form-group', 'document-checklist'])
    );
    expect(wrapper.get('legend').classes()).toContain('document-checklist__title');
    expect(wrapper.get('legend').text()).toBe('Ready checklist');
    expect(wrapper.get('.form-group__hint').text()).toBe('Select all that apply.');
  });

  it('renders a form grid with the selected column class and forwarded attrs', () => {
    const wrapper = mount(FormGrid, {
      props: {
        columns: 'three'
      },
      attrs: {
        id: 'grid'
      },
      slots: {
        default: '<span>Grid body</span>'
      }
    });

    expect(wrapper.get('#grid').classes()).toEqual(
      expect.arrayContaining(['form-grid', 'form-grid--three'])
    );
    expect(wrapper.text()).toContain('Grid body');
  });

  it('renders a form field label, required marker, hint, wide class, and control slot', () => {
    const wrapper = mount(FormField, {
      props: {
        label: 'Given names',
        required: true,
        wide: true,
        hint: 'Use test data.'
      },
      slots: {
        default: '<input class="form-control" />'
      }
    });

    expect(wrapper.get('label').classes()).toEqual(
      expect.arrayContaining(['form-field', 'form-field--wide'])
    );
    expect(wrapper.get('.form-field__label').text()).toBe('Given names *');
    expect(wrapper.get('.form-field__required').text()).toBe('*');
    expect(wrapper.get('.form-field__hint').text()).toBe('Use test data.');
    expect(wrapper.get('input').classes()).toContain('form-control');
  });

  it('uses option keys for select values and display values for visible labels', async () => {
    const wrapper = mount(FormSelect, {
      props: {
        modelValue: 'alpha',
        options: sampleOptions,
        placeholder: 'Select an option'
      }
    });

    const select = wrapper.get('select');
    const options = wrapper.findAll('option');

    expect(select.classes()).toContain('form-select');
    expect((select.element as HTMLSelectElement).value).toBe('alpha');
    expect(options.map((option) => option.text())).toEqual([
      'Select an option',
      'Alpha',
      'Bravo',
      'Charlie'
    ]);
    expect(options[1].attributes('value')).toBe('alpha');
    expect(options[3].attributes('disabled')).toBeDefined();

    await select.setValue('bravo');

    expect(wrapper.emitted('update:modelValue')).toEqual([['bravo']]);
  });

  it('uses option keys for radio choice values and display values for labels', async () => {
    const wrapper = mount(FormChoiceList, {
      props: {
        modelValue: 'alpha',
        name: 'sample',
        options: sampleOptions,
        inline: true
      }
    });

    const inputs = wrapper.findAll('input');

    expect(wrapper.get('.choice-list').classes()).toContain('choice-list--inline');
    expect(wrapper.text()).toContain('Alpha');
    expect(wrapper.text()).toContain('First option');
    expect((inputs[0].element as HTMLInputElement).checked).toBe(true);
    expect(inputs[0].attributes('value')).toBe('alpha');
    expect(inputs[2].attributes('disabled')).toBeDefined();

    await inputs[1].setValue(true);

    expect(wrapper.emitted('update:modelValue')).toEqual([['bravo']]);
  });

  it('uses option keys for checkbox arrays without mutating the original model array', async () => {
    const selected = ['alpha'];
    const wrapper = mount(FormChoiceList, {
      props: {
        modelValue: selected,
        options: sampleOptions,
        type: 'checkbox'
      }
    });

    const inputs = wrapper.findAll('input');

    await inputs[1].setValue(true);
    await inputs[0].setValue(false);

    expect(selected).toEqual(['alpha']);
    expect(wrapper.emitted('update:modelValue')).toEqual([[['alpha', 'bravo']], [[]]]);
  });
});
