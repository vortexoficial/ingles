const quizStorageKey = 'speakup-quiz-draft';
const submissionStorageKey = 'speakup-quiz-submitted';

const scheduleOptions = [
    'Segunda, 08h às 09h',
    'Quarta, 08h às 09h',
    'Segunda, 10h',
    'Quarta, 10h',
    'Segunda, 13h às 14h',
    'Quarta, 13h às 14h',
    'Terça, 13h às 14h',
    'Quinta, 13h às 14h',
    'Segunda, 21h',
    'Quarta, 21h',
    'Terça, 17h30',
    'Quinta, 17h30',
    'Terça, 19h30',
    'Quinta, 19h30',
    'Terça, 20h30',
    'Quinta, 20h30',
];

const quizSteps = [
    {
        tag: 'Etapa 1',
        title: 'Seu contato',
        description: 'Deixe seus dados para continuarmos o diagnóstico e retornar com a melhor proposta.',
        fields: [
            {
                id: 'name',
                label: 'Nome',
                type: 'text',
                required: true,
                placeholder: 'Como você gostaria de ser chamado(a)?',
            },
            {
                id: 'name_contact',
                label: 'WhatsApp',
                type: 'tel',
                required: true,
                placeholder: 'WhatsApp com DDD',
            },
            {
                id: 'email',
                label: 'E-mail',
                type: 'email',
                required: false,
                placeholder: 'Seu melhor e-mail (opcional)',
            },
        ],
    },
    {
        tag: 'Etapa 2',
        title: 'Seu ponto de partida',
        description: 'Quero entender com honestidade de onde você está começando hoje.',
        fields: [
            {
                id: 'studied_english',
                label: 'Qual destas opções mais descreve sua relação com o inglês?',
                type: 'single_choice',
                required: true,
                options: [
                    'Nunca estudei inglês de verdade.',
                    'Só tive contato na escola.',
                    'Já fiz curso, mas parei no meio do caminho.',
                    'Entendo um pouco, mas travo para falar.',
                    'Já me comunico, mas quero ganhar fluidez e segurança.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 3',
        title: 'Seu momento com o inglês',
        description: 'Isso ajuda a diferenciar recomeço, manutenção e aceleração.',
        fields: [
            {
                id: 'last_contact',
                label: 'Quando foi a sua última fase de contato consistente com o inglês?',
                type: 'single_choice',
                required: true,
                options: [
                    'Estou começando agora.',
                    'Tive contato nos últimos 6 meses.',
                    'Faz entre 6 meses e 2 anos.',
                    'Faz mais de 2 anos.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 4',
        title: 'Seu principal bloqueio',
        description: 'Aqui a resposta precisa ser prática: o que mais atrapalha seu avanço hoje?',
        fields: [
            {
                id: 'current_block',
                label: 'O que mais trava você hoje no inglês?',
                type: 'single_choice',
                required: true,
                options: [
                    'Entender quando alguém fala comigo.',
                    'Montar frases sem traduzir tudo na cabeça.',
                    'Falar com confiança e sem medo de errar.',
                    'Ter vocabulário para situações reais.',
                    'Manter constância e encaixar o estudo na rotina.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 5',
        title: 'Seu objetivo principal',
        description: 'Quero entender em que cenário o inglês precisa destravar sua vida.',
        fields: [
            {
                id: 'goal_focus',
                label: 'Para que você quer o inglês agora?',
                type: 'single_choice',
                required: true,
                options: [
                    'Trabalho, atendimento, entrevistas ou reuniões.',
                    'Viagens e situações práticas do dia a dia.',
                    'Faculdade, prova, intercâmbio ou certificação.',
                    'Conversação e desenvolvimento pessoal.',
                    'Ainda estou definindo meu foco, mas quero sair do zero.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 6',
        title: 'Seu prazo de resultado',
        description: 'A urgência muda bastante o tipo de plano mais indicado para você.',
        fields: [
            {
                id: 'urgency',
                label: 'Quando você gostaria de sentir esse avanço na prática?',
                type: 'single_choice',
                required: true,
                options: [
                    'Quero começar imediatamente.',
                    'Nas próximas semanas.',
                    'Dentro dos próximos 3 meses.',
                    'Ainda estou pesquisando, sem urgência.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 7',
        title: 'Formato ideal',
        description: 'Agora precisamos entender qual ritmo e formato fazem sentido para sua rotina.',
        fields: [
            {
                id: 'class_preference',
                label: 'Como você prefere estudar?',
                type: 'single_choice',
                required: true,
                options: [
                    'Aula individual, 1 vez por semana.',
                    'Aula individual, 2 vezes por semana.',
                    'Pequeno grupo, 1 vez por semana.',
                    'Pequeno grupo, 2 vezes por semana.',
                    'Preciso de algo mais flexível.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 8',
        title: 'Sua disponibilidade',
        description: 'Selecione a faixa de horário que hoje é mais realista para você manter.',
        fields: [
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
        tag: 'Etapa 9',
        title: 'Seu espaço na rotina',
        description: 'Esse ponto ajuda a indicar uma trilha que você consegue sustentar.',
        fields: [
            {
                id: 'study_commitment',
                label: 'Quanto tempo você consegue investir fora da aula?',
                type: 'single_choice',
                required: true,
                options: [
                    'Consigo separar de 10 a 15 minutos por dia.',
                    'Consigo praticar algumas vezes na semana.',
                    'No momento, só consigo focar na aula.',
                    'Minha rotina varia bastante; preciso de leveza.',
                ],
            },
        ],
    },
    {
        tag: 'Etapa 10',
        title: 'Sua meta de curto prazo',
        description: 'Quero entender o que seria um avanço concreto para você nos próximos meses.',
        fields: [
            {
                id: 'result_90_days',
                label: 'Se o inglês avançasse bem, o que você gostaria de conseguir fazer nos próximos 90 dias?',
                type: 'textarea',
                required: true,
                placeholder: 'Ex: participar de uma conversa simples, atender melhor no trabalho ou viajar com mais confiança.',
            },
        ],
    },
    {
        tag: 'Etapa 11',
        title: 'Observação final',
        description: 'Se existir alguma dúvida ou contexto extra, este é o melhor lugar para registrar.',
        fields: [
            {
                id: 'doubts',
                label: 'Existe alguma dúvida, receio ou detalhe importante que você queira deixar registrado?',
                type: 'textarea',
                required: false,
                placeholder: 'Se quiser, deixe aqui uma observação final.',
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
        placeholder: 'Escolha o dia',
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
        placeholder: selectedDay ? 'Defina a hora' : 'Primeiro o dia',
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

        if (field.type === 'email' && String(value).trim() !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(String(value).trim())) {
                setFeedback('Informe um e-mail valido ou deixe esse campo em branco.');
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