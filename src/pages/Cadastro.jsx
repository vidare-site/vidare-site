import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

const Cadastro = () => {
  const { content } = useI18n();
  const intake = content.intake;
  const [status, setStatus] = useState('IDLE');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setStatus('SUBMITTING');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  const labelClass = 'block text-[10px] uppercase tracking-widest text-muted font-bold mb-1';
  const inputClass =
    'w-full border-b border-border-hover bg-transparent py-2 text-body transition-colors focus:border-title focus:outline-none placeholder:text-muted/60';
  const sectionHeaderClass =
    "text-[15px] uppercase tracking-[0.15em] font-semibold text-title flex items-center gap-4 mb-6 after:content-[''] after:flex-1 after:h-px after:bg-border";
  const lines = ['01.', '02.', '03.', '04.'];

  return (
    <div className="min-h-screen bg-bg py-xl sm:py-3xl px-lg">
      <motion.div
        className="max-w-4xl mx-auto bg-surface border border-border shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="p-xl md:p-2xl flex flex-col md:flex-row justify-between items-center border-b border-border bg-surface/50 backdrop-blur">
          <div className="flex items-center gap-md">
            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              <img
                src="/assets/logo-dark1.webp"
                alt={content.footer.brandName}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold font-title text-title tracking-tight">
                Ricardo Correa
              </h1>
              <p className="text-[10px] sm:text-xs mt-1 text-muted uppercase tracking-[0.15em]">
                {intake.clinicianRole}
              </p>
            </div>
          </div>
          <div className="mt-md md:mt-0">
            <span className="inline-block px-3 py-1 border border-border-hover text-[10px] uppercase tracking-[0.15em] text-muted">
              {intake.badge}
            </span>
          </div>
        </header>

        {status === 'SUCCESS' && (
          <div className="p-xl bg-section-sage/20 border-b border-border text-center">
            <h3 className="font-title text-2xl text-title mb-sm">{intake.successTitle}</h3>
            <p className="text-body text-base">{intake.successBody}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-xl md:p-2xl space-y-2xl"
          action="https://formspree.io/f/mwvnepvk"
          method="POST"
        >
          <input type="hidden" name="_subject" value={`${intake.badge} - Vidare`} />

          <section>
            <h2 className={sectionHeaderClass}>{intake.sectionTitles.personal}</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-8">
              <div className="md:col-span-7">
                <label className={labelClass}>{intake.labels.fullName}</label>
                <input type="text" name="full_name" className={inputClass} required />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>{intake.labels.age}</label>
                <input type="number" name="age" className={inputClass} required />
              </div>
              <div className="md:col-span-3">
                <label className={labelClass}>{intake.labels.birthDate}</label>
                <input type="date" name="birth_date" className={inputClass} required />
              </div>
              <div className="md:col-span-4">
                <label className={labelClass}>{intake.labels.birthplace}</label>
                <input type="text" name="birthplace" className={inputClass} required />
              </div>
              <div className="md:col-span-4">
                <label className={labelClass}>{intake.labels.firstSessionDate}</label>
                <input type="date" name="first_session_date" className={inputClass} required />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>{intake.labels.personalId}</label>
                <input type="text" name="personal_id" className={inputClass} required />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>{intake.labels.secondaryId}</label>
                <input type="text" name="secondary_id" className={inputClass} />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionHeaderClass}>{intake.sectionTitles.address}</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-8">
              <div className="md:col-span-9">
                <label className={labelClass}>{intake.labels.address}</label>
                <input type="text" name="address" className={inputClass} required />
              </div>
              <div className="md:col-span-3">
                <label className={labelClass}>{intake.labels.addressNumber}</label>
                <input type="text" name="address_number" className={inputClass} required />
              </div>
              <div className="md:col-span-4">
                <label className={labelClass}>{intake.labels.district}</label>
                <input type="text" name="district" className={inputClass} required />
              </div>
              <div className="md:col-span-5">
                <label className={labelClass}>{intake.labels.complement}</label>
                <input type="text" name="complement" className={inputClass} />
              </div>
              <div className="md:col-span-3">
                <label className={labelClass}>{intake.labels.postalCode}</label>
                <input
                  type="text"
                  name="postal_code"
                  placeholder={intake.placeholders.postalCode}
                  className={inputClass}
                  required
                />
              </div>
              <div className="md:col-span-6">
                <label className={labelClass}>{intake.labels.primaryPhone}</label>
                <input
                  type="tel"
                  name="primary_phone"
                  placeholder={intake.placeholders.phone}
                  className={inputClass}
                  required
                />
              </div>
              <div className="md:col-span-6">
                <label className={labelClass}>{intake.labels.patientWhatsapp}</label>
                <input
                  type="tel"
                  name="patient_whatsapp"
                  placeholder={intake.placeholders.phone}
                  className={inputClass}
                  required
                />
              </div>

              <div className="md:col-span-12 mt-md">
                <h3 className="text-[10px] uppercase tracking-[0.15em] text-muted font-medium italic mb-md">
                  {intake.sectionTitles.emergency}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-8">
                  <div className="md:col-span-6">
                    <label className={labelClass}>{intake.labels.emergencyName}</label>
                    <input type="text" name="emergency_name" className={inputClass} required />
                  </div>
                  <div className="md:col-span-6">
                    <label className={labelClass}>{intake.labels.emergencyEmail}</label>
                    <input type="email" name="emergency_email" className={inputClass} required />
                  </div>
                  <div className="md:col-span-6">
                    <label className={labelClass}>{intake.labels.emergencyPhone}</label>
                    <input
                      type="tel"
                      name="emergency_phone"
                      placeholder={intake.placeholders.phone}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className={labelClass}>{intake.labels.emergencyWhatsapp}</label>
                    <input
                      type="tel"
                      name="emergency_whatsapp"
                      placeholder={intake.placeholders.phone}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionHeaderClass}>{intake.sectionTitles.work}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className={labelClass}>{intake.labels.education}</label>
                <input type="text" name="education_level" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>{intake.labels.profession}</label>
                <input type="text" name="profession" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>{intake.labels.institution}</label>
                <input type="text" name="institution" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>{intake.labels.workplace}</label>
                <input type="text" name="workplace" className={inputClass} required />
              </div>
            </div>
          </section>

          <section>
            <h2 className={sectionHeaderClass}>{intake.sectionTitles.history}</h2>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <span className="text-sm text-body">{intake.labels.previousTherapy}</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-body">
                    <input type="radio" name="previous_therapy" value="yes" className="accent-title" required />
                    <span>{intake.options.yes}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-body">
                    <input type="radio" name="previous_therapy" value="no" className="accent-title" required />
                    <span>{intake.options.no}</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <label className={labelClass}>{intake.labels.therapyDuration}</label>
                  <input type="text" name="therapy_duration" className={inputClass} />
                </div>
                <div className="md:col-span-8">
                  <label className="block text-[10px] uppercase tracking-widest text-muted font-bold mb-3">
                    {intake.labels.therapyApproach}
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs text-body">
                    {intake.options.approaches.map((approach) => (
                      <label key={approach.value} className="flex items-center">
                        <input
                          type="checkbox"
                          name="therapy_approaches"
                          value={approach.value}
                          className="mr-1 accent-title"
                        />
                        {approach.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="other_approach"
                placeholder={intake.placeholders.otherApproach}
                className={`${inputClass} italic text-sm`}
              />
            </div>
          </section>

          <section>
            <h2 className={sectionHeaderClass}>{intake.sectionTitles.health}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>{intake.labels.psychiatrist}</label>
                  <input type="text" name="psychiatrist" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{intake.labels.neurologist}</label>
                  <input type="text" name="neurologist" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{intake.labels.diagnoses}</label>
                  <textarea name="diagnoses" rows="2" className={`${inputClass} resize-y min-h-[50px]`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className={labelClass}>{intake.labels.medications}</label>
                  {lines.map((line, index) => (
                    <input
                      key={`medication-${line}`}
                      type="text"
                      name={`medication_${index + 1}`}
                      placeholder={line}
                      className={`${inputClass} text-xs py-1`}
                    />
                  ))}
                </div>
                <div className="space-y-4">
                  <label className={labelClass}>{intake.labels.symptoms}</label>
                  {lines.map((line, index) => (
                    <input
                      key={`symptom-${line}`}
                      type="text"
                      name={`symptom_${index + 1}`}
                      placeholder={line}
                      className={`${inputClass} text-xs py-1`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="pt-10 flex text-center">
            {status === 'ERROR' && (
              <p className="text-red-500 text-xs mb-4 w-full">{intake.submitError}</p>
            )}
            <button
              type="submit"
              disabled={status === 'SUBMITTING'}
              className="w-full bg-title text-light uppercase tracking-[0.12em] py-4 px-6 text-xs font-medium hover:bg-transparent hover:text-title border border-bg hover:border-title transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'SUBMITTING' ? intake.submitBusy : intake.submitIdle}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Cadastro;
