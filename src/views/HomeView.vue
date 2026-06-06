<template>
  <section class="content-workspace" aria-labelledby="app-title">
    <header class="page-header">
      <p class="page-header__eyebrow">Dummy application prototype</p>
      <h2 id="app-title" class="page-header__title">Application</h2>
      <p class="page-header__intro">
        A non-submitting form flow for testing layout, validation copy, and document readiness
        states. Do not enter real identity, or payment details.
      </p>
    </header>

    <ol class="step-list" aria-label="Application progress">
      <li
        v-for="step in progressSteps"
        :key="step.label"
        class="step-list__item"
        :aria-current="step.current ? 'step' : undefined"
      >
        <span class="step-list__meta">Step {{ step.number }}</span>
        <span class="step-list__label">{{ step.label }}</span>
      </li>
    </ol>

    <AppForm aria-label="Dummy application" @submit.prevent="markReviewed">
      <FormSection
        id="application-type"
        title="Application type"
        description="Pick the dummy journey this prototype should represent."
      >
        <FormGroup
          legend="App request"
          hint="The live service asks different questions depending on the request."
        >
          <FormChoiceList
            v-model="form.applicationType"
            inline
            name="applicationType"
            :options="applicationTypes"
          />
        </FormGroup>
      </FormSection>

      <FormSection
        id="applicant"
        title="Applicant details"
        description="Use sample data only. These fields model the information architecture, not the production rules."
      >
        <FormGrid columns="two">
          <FormField label="Given names" required>
            <input v-model="form.givenNames" class="form-control" autocomplete="off" required />
          </FormField>

          <FormField label="Family name" required>
            <input v-model="form.familyName" class="form-control" autocomplete="off" required />
          </FormField>

          <FormField label="Date of birth" required>
            <input v-model="form.dateOfBirth" class="form-control" type="date" required />
          </FormField>

          <FormField label="Place of birth">
            <input
              v-model="form.placeOfBirth"
              class="form-control"
              autocomplete="off"
              placeholder="Sydney NSW"
            />
          </FormField>

          <FormField label="Gender marker">
            <FormSelect
              v-model="form.gender"
              placeholder="Select a marker"
              :options="genderOptions"
            />
          </FormField>

          <FormField label="Name change evidence">
            <FormSelect v-model="form.nameChange" :options="nameChangeOptions" />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        id="contact"
        title="Contact and address"
        description="Contact details are included because the public guidance calls out current address evidence."
      >
        <FormGrid columns="two">
          <FormField label="Email">
            <input v-model="form.email" class="form-control" type="email" autocomplete="off" />
          </FormField>

          <FormField label="Daytime phone">
            <input v-model="form.phone" class="form-control" autocomplete="off" inputmode="tel" />
          </FormField>

          <FormField label="Residential address" wide>
            <textarea v-model="form.address" class="form-textarea" autocomplete="off"></textarea>
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        id="documents"
        title="Documents"
        description="Checklist-style controls make this useful for testing spacing, wrapping, and mixed control types."
      >
        <FormGrid id="citizenship" columns="two">
          <FormField label="Citizenship evidence">
            <FormSelect v-model="form.citizenshipEvidence" :options="citizenshipEvidenceOptions" />
          </FormField>

          <FormField label="Photo status">
            <FormSelect v-model="form.photoStatus" :options="photoStatusOptions" />
          </FormField>
        </FormGrid>

        <FormGroup class="document-checklist" legend="Ready to lodge checklist" title-variant>
          <FormChoiceList v-model="form.documents" type="checkbox" :options="documentOptions" />
        </FormGroup>
      </FormSection>

      <FormSection
        id="referee"
        title="Referee or guarantor"
        description="The real rules depend on where the applicant lodges and the type of application."
      >
        <FormGrid columns="three">
          <FormField label="Full name">
            <input v-model="form.refereeName" class="form-control" autocomplete="off" />
          </FormField>

          <FormField label="Known applicant for">
            <FormSelect v-model="form.refereeKnownFor" :options="refereeKnownForOptions" />
          </FormField>

          <FormField label="Contact phone">
            <input
              v-model="form.refereePhone"
              class="form-control"
              autocomplete="off"
              inputmode="tel"
            />
          </FormField>
        </FormGrid>
      </FormSection>

      <FormSection
        id="lodge"
        title="Print and lodge"
        description="The production service generates a printable application. This dummy flow only shows the review state."
      >
        <div id="review" class="summary-panel" aria-live="polite">
          <h4 class="form-section__title">Review snapshot</h4>
          <dl class="summary-panel__grid">
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Applicant</dt>
              <dd class="summary-panel__value">{{ applicantName }}</dd>
            </div>
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Type</dt>
              <dd class="summary-panel__value">{{ applicationTypeDisplayValue }}</dd>
            </div>
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Documents ready</dt>
              <dd class="summary-panel__value">
                {{ form.documents.length }} of {{ documentOptions.length }}
              </dd>
            </div>
          </dl>
          <p class="form-field__hint">
            {{ reviewedMessage }}
          </p>
        </div>
      </FormSection>

      <div class="form-actions">
        <button class="button" type="button" @click="resetForm">Reset dummy data</button>
        <button class="button button--primary" type="submit">Mark ready for review</button>
      </div>
    </AppForm>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
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

const applicationTypes: readonly FormOption[] = [
  {
    key: 'adult',
    displayValue: 'Adult app',
    hint: 'For an Australian citizen aged 18 or over.'
  },
  {
    key: 'renewal',
    displayValue: 'Renewal',
    hint: 'For modelling the shorter renewal path.'
  },
  {
    key: 'child',
    displayValue: 'Child app',
    hint: 'For testing consent and guardian follow-up sections later.'
  }
] as const;

const genderOptions: readonly FormOption[] = [
  { key: 'f', displayValue: 'F' },
  { key: 'm', displayValue: 'M' },
  { key: 'x', displayValue: 'X' }
] as const;

const nameChangeOptions: readonly FormOption[] = [
  { key: 'none', displayValue: 'No change of name' },
  { key: 'marriage-certificate', displayValue: 'Marriage certificate' },
  { key: 'change-of-name-certificate', displayValue: 'Change of name certificate' },
  { key: 'other-supporting-document', displayValue: 'Other supporting document' }
] as const;

const citizenshipEvidenceOptions: readonly FormOption[] = [
  { key: 'australian-birth-certificate', displayValue: 'Australian birth certificate' },
  { key: 'australian-citizenship-certificate', displayValue: 'Australian citizenship certificate' },
  { key: 'previous-app', displayValue: 'Previous app' }
] as const;

const photoStatusOptions: readonly FormOption[] = [
  { key: 'not-started', displayValue: 'Not started' },
  { key: 'photos-booked', displayValue: 'Photos booked' },
  { key: 'two-compliant-photos-ready', displayValue: 'Two compliant photos ready' }
] as const;

const documentOptions: readonly FormOption[] = [
  { key: 'citizenship-evidence-selected', displayValue: 'Citizenship evidence selected' },
  { key: 'identity-document-ready', displayValue: 'Identity document with photo and signature' },
  {
    key: 'residential-address-evidence',
    displayValue: 'Current residential address evidence'
  },
  { key: 'two-app-photos', displayValue: 'Two app photos' },
  { key: 'printed-application-ready', displayValue: 'Printed application ready for lodging' }
] as const;

const refereeKnownForOptions: readonly FormOption[] = [
  { key: 'less-than-12-months', displayValue: 'Less than 12 months' },
  { key: '1-to-2-years', displayValue: '1 to 2 years' },
  { key: 'more-than-2-years', displayValue: 'More than 2 years' }
] as const;

const progressSteps = [
  { number: 1, label: 'Details', current: true },
  { number: 2, label: 'Documents', current: false },
  { number: 3, label: 'Referee', current: false },
  { number: 4, label: 'Lodge', current: false }
] as const;

type ApplicationForm = {
  applicationType: string;
  givenNames: string;
  familyName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  nameChange: string;
  email: string;
  phone: string;
  address: string;
  citizenshipEvidence: string;
  photoStatus: string;
  documents: string[];
  refereeName: string;
  refereeKnownFor: string;
  refereePhone: string;
};

const createInitialForm = (): ApplicationForm => ({
  applicationType: 'adult',
  givenNames: 'Alex',
  familyName: 'Citizen',
  dateOfBirth: '1990-04-12',
  placeOfBirth: 'Sydney NSW',
  gender: '',
  nameChange: 'none',
  email: 'alex.citizen@example.test',
  phone: '0400 000 000',
  address: '100 Sample Street\nCanberra ACT 2600',
  citizenshipEvidence: 'australian-birth-certificate',
  photoStatus: 'not-started',
  documents: ['citizenship-evidence-selected'],
  refereeName: 'Jordan Example',
  refereeKnownFor: 'more-than-2-years',
  refereePhone: '02 0000 0000'
});

const form = reactive(createInitialForm());
const hasReviewed = ref(false);

const applicantName = computed(() => {
  const name = `${form.givenNames} ${form.familyName}`.trim();
  return name || 'Unnamed applicant';
});

const getOptionDisplayValue = (options: readonly FormOption[], key: string): string =>
  options.find((option) => option.key === key)?.displayValue ?? key;

const applicationTypeDisplayValue = computed(() =>
  getOptionDisplayValue(applicationTypes, form.applicationType)
);

const reviewedMessage = computed(() =>
  hasReviewed.value
    ? 'Dummy review marked. No data has been sent or saved.'
    : 'Complete the dummy fields, then mark the form ready to test the review state.'
);

const markReviewed = (): void => {
  hasReviewed.value = true;
};

const resetForm = (): void => {
  Object.assign(form, createInitialForm());
  hasReviewed.value = false;
};
</script>
