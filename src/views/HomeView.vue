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
      <li v-for="step in progressSteps" :key="step.label" class="step-list__item"
        :aria-current="step.current ? 'step' : undefined">
        <span class="step-list__meta">Step {{ step.number }}</span>
        <span class="step-list__label">{{ step.label }}</span>
      </li>
    </ol>

    <form class="form-panel" aria-label="Dummy application" @submit.prevent="markReviewed">
      <section id="application-type" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Application type</h3>
          <p class="form-section__text">Pick the dummy journey this prototype should represent.</p>
        </div>

        <fieldset class="form-group">
          <legend class="form-group__legend">App request</legend>
          <p class="form-group__hint">
            The live service asks different questions depending on the request.
          </p>
          <div class="choice-list choice-list--inline">
            <label v-for="option in applicationTypes" :key="option.value" class="choice">
              <input v-model="form.applicationType" name="applicationType" type="radio" :value="option.value" />
              <span class="choice__content">
                <span class="choice__label">{{ option.label }}</span>
                <span class="choice__hint">{{ option.hint }}</span>
              </span>
            </label>
          </div>
        </fieldset>
      </section>

      <section id="applicant" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Applicant details</h3>
          <p class="form-section__text">
            Use sample data only. These fields model the information architecture, not the
            production rules.
          </p>
        </div>

        <div class="form-grid form-grid--two">
          <label class="form-field">
            <span class="form-field__label">Given names <span class="form-field__required">*</span></span>
            <input v-model="form.givenNames" class="form-control" autocomplete="off" required />
          </label>

          <label class="form-field">
            <span class="form-field__label">Family name <span class="form-field__required">*</span></span>
            <input v-model="form.familyName" class="form-control" autocomplete="off" required />
          </label>

          <label class="form-field">
            <span class="form-field__label">Date of birth <span class="form-field__required">*</span></span>
            <input v-model="form.dateOfBirth" class="form-control" type="date" required />
          </label>

          <label class="form-field">
            <span class="form-field__label">Place of birth</span>
            <input v-model="form.placeOfBirth" class="form-control" autocomplete="off" placeholder="Sydney NSW" />
          </label>

          <label class="form-field">
            <span class="form-field__label">Gender marker</span>
            <select v-model="form.gender" class="form-select">
              <option value="">Select a marker</option>
              <option>F</option>
              <option>M</option>
              <option>X</option>
            </select>
          </label>

          <label class="form-field">
            <span class="form-field__label">Name change evidence</span>
            <select v-model="form.nameChange" class="form-select">
              <option>No change of name</option>
              <option>Marriage certificate</option>
              <option>Change of name certificate</option>
              <option>Other supporting document</option>
            </select>
          </label>
        </div>
      </section>

      <section id="contact" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Contact and address</h3>
          <p class="form-section__text">
            Contact details are included because the public guidance calls out current address
            evidence.
          </p>
        </div>

        <div class="form-grid form-grid--two">
          <label class="form-field">
            <span class="form-field__label">Email</span>
            <input v-model="form.email" class="form-control" type="email" autocomplete="off" />
          </label>

          <label class="form-field">
            <span class="form-field__label">Daytime phone</span>
            <input v-model="form.phone" class="form-control" autocomplete="off" inputmode="tel" />
          </label>

          <label class="form-field form-field--wide">
            <span class="form-field__label">Residential address</span>
            <textarea v-model="form.address" class="form-textarea" autocomplete="off"></textarea>
          </label>
        </div>
      </section>

      <section id="documents" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Documents</h3>
          <p class="form-section__text">
            Checklist-style controls make this useful for testing spacing, wrapping, and mixed
            control types.
          </p>
        </div>

        <div id="citizenship" class="form-grid form-grid--two">
          <label class="form-field">
            <span class="form-field__label">Citizenship evidence</span>
            <select v-model="form.citizenshipEvidence" class="form-select">
              <option>Australian birth certificate</option>
              <option>Australian citizenship certificate</option>
              <option>Previous app</option>
            </select>
          </label>

          <label class="form-field">
            <span class="form-field__label">Photo status</span>
            <select v-model="form.photoStatus" class="form-select">
              <option>Not started</option>
              <option>Photos booked</option>
              <option>Two compliant photos ready</option>
            </select>
          </label>
        </div>

        <fieldset class="form-group document-checklist">
          <legend class="document-checklist__title">Ready to lodge checklist</legend>
          <label v-for="item in documentItems" :key="item" class="choice">
            <input v-model="form.documents" type="checkbox" :value="item" />
            <span class="choice__content">
              <span class="choice__label">{{ item }}</span>
            </span>
          </label>
        </fieldset>
      </section>

      <section id="referee" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Referee or guarantor</h3>
          <p class="form-section__text">
            The real rules depend on where the applicant lodges and the type of application.
          </p>
        </div>

        <div class="form-grid form-grid--three">
          <label class="form-field">
            <span class="form-field__label">Full name</span>
            <input v-model="form.refereeName" class="form-control" autocomplete="off" />
          </label>

          <label class="form-field">
            <span class="form-field__label">Known applicant for</span>
            <select v-model="form.refereeKnownFor" class="form-select">
              <option>Less than 12 months</option>
              <option>1 to 2 years</option>
              <option>More than 2 years</option>
            </select>
          </label>

          <label class="form-field">
            <span class="form-field__label">Contact phone</span>
            <input v-model="form.refereePhone" class="form-control" autocomplete="off" inputmode="tel" />
          </label>
        </div>
      </section>

      <section id="lodge" class="form-section">
        <div class="form-section__header">
          <h3 class="form-section__title">Print and lodge</h3>
          <p class="form-section__text">
            The production service generates a printable application. This dummy flow only shows the
            review state.
          </p>
        </div>

        <div id="review" class="summary-panel" aria-live="polite">
          <h4 class="form-section__title">Review snapshot</h4>
          <dl class="summary-panel__grid">
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Applicant</dt>
              <dd class="summary-panel__value">{{ applicantName }}</dd>
            </div>
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Type</dt>
              <dd class="summary-panel__value">{{ form.applicationType }}</dd>
            </div>
            <div class="summary-panel__item">
              <dt class="summary-panel__label">Documents ready</dt>
              <dd class="summary-panel__value">
                {{ form.documents.length }} of {{ documentItems.length }}
              </dd>
            </div>
          </dl>
          <p class="form-field__hint">
            {{ reviewedMessage }}
          </p>
        </div>
      </section>

      <div class="form-actions">
        <button class="button" type="button" @click="resetForm">Reset dummy data</button>
        <button class="button button--primary" type="submit">Mark ready for review</button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const applicationTypes = [
  {
    label: 'Adult app',
    value: 'Adult app',
    hint: 'For an Australian citizen aged 18 or over.'
  },
  {
    label: 'Renewal',
    value: 'Renewal',
    hint: 'For modelling the shorter renewal path.'
  },
  {
    label: 'Child app',
    value: 'Child app',
    hint: 'For testing consent and guardian follow-up sections later.'
  }
] as const;

const documentItems = [
  'Citizenship evidence selected',
  'Identity document with photo and signature',
  'Current residential address evidence',
  'Two app photos',
  'Printed application ready for lodging'
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
  applicationType: 'Adult app',
  givenNames: 'Alex',
  familyName: 'Citizen',
  dateOfBirth: '1990-04-12',
  placeOfBirth: 'Sydney NSW',
  gender: '',
  nameChange: 'No change of name',
  email: 'alex.citizen@example.test',
  phone: '0400 000 000',
  address: '100 Sample Street\nCanberra ACT 2600',
  citizenshipEvidence: 'Australian birth certificate',
  photoStatus: 'Not started',
  documents: ['Citizenship evidence selected'],
  refereeName: 'Jordan Example',
  refereeKnownFor: 'More than 2 years',
  refereePhone: '02 0000 0000'
});

const form = reactive(createInitialForm());
const hasReviewed = ref(false);

const applicantName = computed(() => {
  const name = `${form.givenNames} ${form.familyName}`.trim();
  return name || 'Unnamed applicant';
});

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
