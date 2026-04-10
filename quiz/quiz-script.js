const quizStorageKey = 'speakup-quiz-draft';
const submissionStorageKey = 'speakup-quiz-submitted';

const scheduleOptions = [
    'Segunda, das 08h as 09h',
    'Quarta, das 08h as 09h',
    'Segunda, as 10h',
    'Quarta, as 10h',
    'Segunda, das 13h as 14h',
    'Quarta, das 13h as 14h',
    'Terça, das 13 as 14h',
    'Quinta, das 13h as 14h',
    'Segunda, as 21h',
    'Quarta, as 21h',
    'Terça, as 17:30h',
    'Quinta, as 17:30h',
    'Terça, as 19:30h',
    'Quinta, as 19:30h',
    'Terça, as 20:30h',
    'Quinta, as 20:30h',
];

const quizSteps = [
    {
        tag: 'Etapa 1',
        title: 'Seus dados para contato',
        description: 'Começamos com o básico para podermos continuar sua jornada com contexto e retorno adequado.',
        fields: [
            {
                id: 'name',
                label: 'Nome',
                type: 'text',
                required: true,
                placeholder: 'Seu nome',
            },
            {
                id: 'name_contact',
                label: 'WhatsApp',
                type: 'tel',
                required: true,
                placeholder: 'Seu WhatsApp (com DDD)',
            },
        ],
    },
    {
        tag: 'Etapa 2',
        title: 'Seu histórico com o inglês',
        description: 'Aqui entendemos o seu ponto de partida para indicar um caminho mais alinhado.',
        fields: [
            {
                id: 'studied_english',
                label: 'Você já estudou inglês?',
                type: 'single_choice',
                required: true,
                options: [
                    'Não, sou iniciante.',
                    'Sim, mas apenas na escola.',
                    'Sim, mas não lembro de nada ou quase nada.',
                    'Sim, entendo mas tenho dificuldade em me comunicar.',
                    'Outro',
                ],
            },
            {
                id: 'study_time',
                label: 'Em caso positivo, por quanto tempo estudou?',
                type: 'single_choice',
                required: false,
                showIf: {
                    field: 'studied_english',
                    operator: 'not_equals',
                    value: 'Não, sou iniciante.',
                },
                options: [
                    'Menos de um ano.',
                    'De dois a três anos.',
                    'Mais de três anos.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 3',
        title: 'Formato e disponibilidade',
        description: 'Precisamos entender como o inglês pode se encaixar na sua rotina de forma viável.',
        fields: [
            {
                id: 'class_preference',
                label: 'Você tem preferências por aulas...',
                type: 'single_choice',
                required: true,
                options: [
                    'Individuais, uma vez na semana.',
                    'Individuais, duas vezes na semana.',
                    'Em pequenos grupos, uma vez na semana.',
                    'Em pequenos grupos, duas vezes na semana.',
                    'Outro',
                ],
            },
            {
                id: 'best_time',
                label: 'Qual melhor horário para você?',
                type: 'schedule_choice',
                required: true,
                options: scheduleOptions,
            },
        ],
    },
    {
        tag: 'Etapa 4',
        title: 'Seu objetivo e sua maior dificuldade',
        description: 'Essas respostas ajudam a personalizar a comunicação e a direção da sua jornada.',
        fields: [
            {
                id: 'learning_goal',
                label: 'Qual seu objetivo no aprendizado? (Pessoal, Profissional, Acadêmico, Viagens ou outros)',
                type: 'textarea',
                required: false,
                placeholder: 'Seu objetivo',
            },
            {
                id: 'biggest_difficulty',
                label: 'Qual sua maior dificuldade no aprendizado da Língua Inglesa?',
                type: 'textarea',
                required: false,
                placeholder: 'Sua maior dificuldade',
            },
        ],
    },
    {
        tag: 'Etapa 5',
        title: 'Indique e ganhe',
        description: 'Indique um amigo e receba nosso e-book "Speaking Study Plan".',
        fields: [
            {
                id: 'referral_name',
                label: 'Nome do indicado',
                type: 'text',
                required: false,
                placeholder: 'Nome do indicado',
            },
            {
                id: 'referral_whatsapp',
                label: 'WhatsApp do indicado',
                type: 'tel',
                required: false,
                placeholder: 'WhatsApp do indicado',
            },
        ],
    },
    {
        tag: 'Etapa 6',
        title: 'Insira sua dúvida',
        description: 'Se quiser, deixe sua dúvida aqui antes de enviar.',
        fields: [
            {
                id: 'doubts',
                label: 'Insira sua dúvida',
                type: 'textarea',
                required: false,
                placeholder: 'Escreva sua dúvida aqui',
            },
        ],
    },
];

const form = document.getElementById('quiz-form');
const stepTag = document.getElementById('step-tag');
const stepTitle = document.getElementById('step-title');
const stepDescription = document.getElementById('step-description');
const stepFields = document.getElementById('step-fields');
const feedback = document.getElementById('form-feedback');
const draftMessage = document.getElementById('draft-message');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const submitButton = document.getElementById('submit-button');
const successState = document.getElementById('success-state');
const successLoading = document.getElementById('success-loading');
const successComplete = document.getElementById('success-complete');
const successHomeLink = document.getElementById('success-home-link');

let currentStepIndex = 0;
let formData = loadDraft();
let submissionTimer = null;

function loadDraft() {
    try {
        const draft = window.localStorage.getItem(quizStorageKey);
        return draft ? JSON.parse(draft) : {};
    } catch {
        return {};
    }
}

function saveDraft() {
    window.localStorage.setItem(quizStorageKey, JSON.stringify(formData));
}

function getVisibleFields(step) {
    return step.fields.filter((field) => {
        if (!field.showIf) {
            return true;
        }

        const sourceValue = formData[field.showIf.field] || '';

        if (sourceValue === '') {
            return false;
        }

        if (field.showIf.operator === 'not_equals') {
            return sourceValue !== field.showIf.value;
        }

        return true;
    });
}

function setFeedback(message) {
    if (!message) {
        feedback.textContent = '';
        feedback.classList.add('hidden');
        return;
    }

    feedback.textContent = message;
    feedback.classList.remove('hidden');
}

function updateProgress() {
    const total = quizSteps.length;
    const current = currentStepIndex + 1;
    if (progressText) {
        progressText.textContent = `Etapa ${current} de ${total}`;
    }

    if (progressFill) {
        progressFill.style.width = `${(current / total) * 100}%`;
    }
}

function getScheduleMap(options) {
    return options.reduce((map, option) => {
        const [day, time] = option.split(', ');
        if (!day || !time) {
            return map;
        }

        if (!map[day]) {
            map[day] = [];
        }

        map[day].push({
            label: time,
            value: option,
        });

        return map;
    }, {});
}

function closeScheduleDropdowns(exceptDropdown) {
    document.querySelectorAll('.schedule-dropdown.is-open').forEach((dropdown) => {
        if (dropdown === exceptDropdown) {
            return;
        }

        dropdown.classList.remove('is-open');
        const trigger = dropdown.querySelector('.schedule-trigger');
        trigger?.setAttribute('aria-expanded', 'false');
    });
}

function createScheduleDropdown({
    caption,
    placeholder,
    items,
    selectedValue,
    disabled = false,
    onSelect,
}) {
    const box = document.createElement('div');
    box.className = 'schedule-box';

    const captionElement = document.createElement('span');
    captionElement.className = 'schedule-caption';
    captionElement.textContent = caption;

    const dropdown = document.createElement('div');
    dropdown.className = 'schedule-dropdown';
    if (disabled) {
        dropdown.classList.add('is-disabled');
    }

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'schedule-trigger';
    trigger.disabled = disabled;
    trigger.setAttribute('aria-expanded', 'false');

    const triggerLabel = document.createElement('span');
    triggerLabel.className = 'schedule-trigger-label';
    const selectedItem = items.find((item) => item.value === selectedValue);
    triggerLabel.textContent = selectedItem ? selectedItem.label : placeholder;
    if (!selectedItem) {
        triggerLabel.classList.add('is-placeholder');
    }

    const triggerIcon = document.createElement('span');
    triggerIcon.className = 'schedule-trigger-icon';
    triggerIcon.setAttribute('aria-hidden', 'true');

    const menu = document.createElement('div');
    menu.className = 'schedule-menu';

    if (items.length === 0) {
        const emptyState = document.createElement('span');
        emptyState.className = 'schedule-empty';
        emptyState.textContent = placeholder;
        menu.appendChild(emptyState);
    }

    items.forEach((item) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'schedule-option';
        option.textContent = item.label;
        if (item.value === selectedValue) {
            option.classList.add('is-selected');
        }

        option.addEventListener('click', () => {
            onSelect(item.value);
            dropdown.classList.remove('is-open');
            trigger.setAttribute('aria-expanded', 'false');
        });

        menu.appendChild(option);
    });

    trigger.addEventListener('click', () => {
        if (disabled) {
            return;
        }

        const isOpen = dropdown.classList.toggle('is-open');
        closeScheduleDropdowns(isOpen ? dropdown : null);
        trigger.setAttribute('aria-expanded', String(isOpen));
    });

    trigger.appendChild(triggerLabel);
    trigger.appendChild(triggerIcon);
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    box.appendChild(captionElement);
    box.appendChild(dropdown);
    return box;
}

function buildScheduleInput(field) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const group = document.createElement('div');
    group.className = 'schedule-group';

    const scheduleMap = getScheduleMap(field.options || []);
    const selectedValue = formData[field.id] || '';
    const selectedEntry = Object.entries(scheduleMap).find(([, times]) => times.some((time) => time.value === selectedValue));
    const selectedDay = formData[`${field.id}_day`] || (selectedEntry ? selectedEntry[0] : '');

    const dayItems = Object.keys(scheduleMap).map((day) => ({
        label: day,
        value: day,
    }));
    const timeItems = (scheduleMap[selectedDay] || []).map((time) => ({
        label: time.label,
        value: time.value,
    }));

    const dayDropdown = createScheduleDropdown({
        caption: 'Dia',
        placeholder: 'Selecione o dia',
        items: dayItems,
        selectedValue: selectedDay,
        onSelect: (value) => {
            formData[`${field.id}_day`] = value;
            formData[field.id] = '';
            saveDraft();
            renderStep();
        },
    });

    const timeDropdown = createScheduleDropdown({
        caption: 'Horario',
        placeholder: selectedDay ? 'Escolha o horario' : 'Selecione o dia',
        items: timeItems,
        selectedValue,
        disabled: !selectedDay,
        onSelect: (value) => {
            formData[field.id] = value;
            saveDraft();
            renderStep();
        },
    });

    group.appendChild(dayDropdown);
    group.appendChild(timeDropdown);
    wrapper.appendChild(group);
    return wrapper;
}

function buildInput(field) {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('label');
    label.className = 'field-label';
    label.textContent = field.label + (field.required ? ' *' : '');
    wrapper.appendChild(label);

    if (field.type === 'schedule_choice') {
        return buildScheduleInput(field);
    }

    if (field.type === 'single_choice') {
        const group = document.createElement('div');
        group.className = 'choice-group';

        field.options.forEach((option) => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'choice-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = field.id;
            input.value = option;
            input.checked = formData[field.id] === option;
            input.addEventListener('change', () => {
                formData[field.id] = option;
                saveDraft();

                if (field.id === 'studied_english' && option === 'Não, sou iniciante.') {
                    delete formData.study_time;
                    saveDraft();
                }

                renderStep();
            });

            const text = document.createElement('span');
            text.className = 'choice-option-label';
            text.textContent = option;

            optionLabel.appendChild(input);
            optionLabel.appendChild(text);
            group.appendChild(optionLabel);
        });

        wrapper.appendChild(group);
        return wrapper;
    }

    const input = field.type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
    input.className = 'form-control';
    input.id = field.id;
    input.name = field.id;
    input.placeholder = field.placeholder || '';
    input.required = Boolean(field.required);
    input.value = formData[field.id] || '';

    if (field.type !== 'textarea') {
        input.type = field.type;
    }

    input.addEventListener('input', (event) => {
        if (field.type === 'tel') {
            let digits = event.target.value.replace(/\D/g, '').slice(0, 11);
            if (digits.length <= 10) {
                digits = digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                digits = digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            event.target.value = digits.trim().replace(/-$/, '');
            formData[field.id] = event.target.value;
        } else {
            formData[field.id] = event.target.value;
        }
        saveDraft();
    });

    wrapper.appendChild(input);
    return wrapper;
}

function renderStep() {
    const step = quizSteps[currentStepIndex];
    const visibleFields = getVisibleFields(step);

    stepTag.textContent = step.tag;
    stepTitle.textContent = step.title;
    stepDescription.textContent = step.description;
    stepFields.innerHTML = '';
    visibleFields.forEach((field) => {
        stepFields.appendChild(buildInput(field));
    });

    prevButton.disabled = false;
    prevButton.textContent = currentStepIndex === 0 ? 'Voltar ao site' : 'Voltar';
    nextButton.classList.toggle('hidden', currentStepIndex === quizSteps.length - 1);
    submitButton.classList.toggle('hidden', currentStepIndex !== quizSteps.length - 1);
    updateProgress();
    setFeedback('');
}

function validateStep() {
    const step = quizSteps[currentStepIndex];
    const visibleFields = getVisibleFields(step);

    for (const field of visibleFields) {
        if (!field.required) {
            continue;
        }

        const value = formData[field.id];
        if (!value || String(value).trim() === '') {
            setFeedback('Preencha os campos obrigatórios desta etapa para continuar.');
            return false;
        }

        if (field.type === 'tel' && String(value).trim() !== '') {
            const digits = String(value).replace(/\D/g, '');
            if (digits.length < 10 || digits.length > 11) {
                setFeedback('Informe o WhatsApp com DDD (ex: 13 99999-9999).');
                return false;
            }
        }
    }

    setFeedback('');
    return true;
}

function goToNextStep() {
    if (!validateStep()) {
        return;
    }

    if (currentStepIndex < quizSteps.length - 1) {
        currentStepIndex += 1;
        renderStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToPreviousStep() {
    if (currentStepIndex === 0) {
        window.location.href = '../index.html';
        return;
    }

    currentStepIndex -= 1;
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSubmit(event) {
    event.preventDefault();
    if (!validateStep()) {
        return;
    }

    window.localStorage.setItem(submissionStorageKey, JSON.stringify({
        submittedAt: new Date().toISOString(),
        payload: formData,
    }));
    window.localStorage.removeItem(quizStorageKey);
    document.body.classList.add('quiz-submitted');
    successLoading?.classList.remove('hidden');
    successComplete?.classList.add('hidden');
    successState.classList.remove('hidden');
    successState.setAttribute('aria-hidden', 'false');
    setFeedback('');

    if (submissionTimer) {
        window.clearTimeout(submissionTimer);
    }

    submissionTimer = window.setTimeout(() => {
        successLoading?.classList.add('hidden');
        successComplete?.classList.remove('hidden');
        successHomeLink?.focus();
    }, 1400);
}

function restoreDraftMessage() {
    if (Object.keys(formData).length === 0) {
        draftMessage.classList.add('hidden');
        return;
    }

    draftMessage.textContent = 'Encontramos um rascunho salvo neste dispositivo. Você pode continuar de onde parou.';
    draftMessage.classList.remove('hidden');
}

function restartQuiz() {
    if (submissionTimer) {
        window.clearTimeout(submissionTimer);
        submissionTimer = null;
    }

    window.localStorage.removeItem(quizStorageKey);
    window.localStorage.removeItem(submissionStorageKey);
    formData = {};
    currentStepIndex = 0;
    document.body.classList.remove('quiz-submitted');
    successState.classList.add('hidden');
    successState.setAttribute('aria-hidden', 'true');
    successLoading?.classList.remove('hidden');
    successComplete?.classList.add('hidden');
    restoreDraftMessage();
    renderStep();
}

nextButton.addEventListener('click', goToNextStep);
prevButton.addEventListener('click', goToPreviousStep);
form.addEventListener('submit', handleSubmit);

document.addEventListener('click', (event) => {
    if (event.target.closest('.schedule-dropdown')) {
        return;
    }

    closeScheduleDropdowns();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeScheduleDropdowns();
    }
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
    });

    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
}

restoreDraftMessage();
renderStep();