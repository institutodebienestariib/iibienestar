// Variables globales para los modales
let currentModal = null;

// Inicialización cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Inicializar animaciones de scroll si existen
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }

    // Agregar event listeners para cerrar modales al hacer click fuera
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Event listener para tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentModal) {
            closeModal(currentModal);
        }
    });

    // Inicializar formularios
    initializeForms();
}

// Función para abrir modal de detalles del módulo
function openModuleDetailsModal(moduleId) {
    const modal = document.getElementById('moduleDetailsModal');
    const modalModuleName = document.getElementById('modalModuleName');
    
    // Datos de ejemplo para los módulos
    const moduleData = {
        'modulo1': {
            name: 'Módulo 1: Introducción',
            content: {
                presentation: 'https://ejemplo.com/presentacion1.pdf',
                video: 'https://ejemplo.com/video1.mp4',
                zoom: 'https://zoom.us/j/123456789',
                bibliography: 'https://ejemplo.com/bibliografia1.pdf'
            }
        },
        'modulo2': {
            name: 'Módulo 2: Fundamentos del Lenguaje',
            content: {
                presentation: 'https://ejemplo.com/presentacion2.pdf',
                video: 'https://ejemplo.com/video2.mp4',
                zoom: 'https://zoom.us/j/987654321',
                bibliography: 'https://ejemplo.com/bibliografia2.pdf'
            }
        },
        'modulo3': {
            name: 'Módulo 3: Estructuras Avanzadas',
            content: {
                presentation: '#',
                video: '#',
                zoom: '#',
                bibliography: '#'
            }
        }
    };

    if (moduleData[moduleId]) {
        modalModuleName.textContent = moduleData[moduleId].name;
        updateModuleContentLinks(moduleData[moduleId].content);
    }

    showModal('moduleDetailsModal');
}

// Función para actualizar los enlaces del contenido del módulo
function updateModuleContentLinks(content) {
    const moduleContent = document.getElementById('moduleContent');
    const links = moduleContent.querySelectorAll('a');
    
    links[0].href = content.presentation; // Presentación
    links[1].href = content.video; // Video
    links[2].href = content.zoom; // Zoom
    links[3].href = content.bibliography; // Bibliografía
}

// Función para abrir modal de subir tarea
function openUploadTaskModal(taskId) {
    const modal = document.getElementById('uploadTaskModal');
    const modalTaskName = document.getElementById('modalTaskName');
    
    // Datos de ejemplo para las tareas
    const taskData = {
        'tarea123': 'Reporte Final Módulo 2',
        'tarea456': 'Investigación de Casos'
    };

    if (taskData[taskId]) {
        modalTaskName.textContent = taskData[taskId];
    }

    showModal('uploadTaskModal');
}

// Función para ver retroalimentación de tarea
function viewTaskFeedback(taskId) {
    const modal = document.getElementById('viewFeedbackModal');
    const feedbackTaskName = document.getElementById('feedbackTaskName');
    const feedbackScore = document.getElementById('feedbackScore');
    const feedbackObservations = document.getElementById('feedbackObservations');
    
    // Datos de ejemplo para retroalimentación
    const feedbackData = {
        'tarea456': {
            name: 'Investigación de Casos',
            score: '90/100',
            observations: 'Excelente trabajo. Buen análisis de los datos. Considera mejorar la estructura de las conclusiones en futuras entregas. Tu investigación muestra profundidad y comprensión del tema.'
        }
    };

    if (feedbackData[taskId]) {
        feedbackTaskName.textContent = feedbackData[taskId].name;
        feedbackScore.textContent = feedbackData[taskId].score;
        feedbackObservations.textContent = feedbackData[taskId].observations;
    }

    showModal('viewFeedbackModal');
}

// Función para abrir modal del foro
function openForumModal(forumId) {
    const modal = document.getElementById('forumModal');
    const modalForumName = document.getElementById('modalForumName');
    
    // Datos de ejemplo para foros
    const forumData = {
        'foro1': 'Dudas sobre Módulo 2',
        'foro2': 'Debate sobre IA'
    };

    if (forumData[forumId]) {
        modalForumName.textContent = forumData[forumId];
        loadForumPosts(forumId);
    }

    showModal('forumModal');
}

// Función para cargar posts del foro
function loadForumPosts(forumId) {
    const forumPosts = document.getElementById('forumPosts');
    
    // Datos de ejemplo para posts
    const postsData = {
        'foro1': [
            {
                author: 'Estudiante A',
                date: '15/07/2024 10:30 AM',
                content: '¡Hola a todos! Tengo una duda sobre el ejercicio 3 del módulo 2. ¿Alguien podría darme una pista?',
                replies: [
                    {
                        author: 'Docente X',
                        date: '15/07/2024 11:00 AM',
                        content: 'Hola Estudiante A, revisa la sección sobre bucles "for" en las diapositivas de la clase. ¡Espero te ayude!'
                    }
                ]
            }
        ],
        'foro2': [
            {
                author: 'Estudiante B',
                date: '14/07/2024 14:20 PM',
                content: '¿Qué opinan sobre el impacto de la IA en el futuro del trabajo? Me gustaría conocer sus perspectivas.',
                replies: [
                    {
                        author: 'Estudiante C',
                        date: '14/07/2024 15:30 PM',
                        content: 'Creo que la IA va a transformar muchas industrias, pero también creará nuevas oportunidades laborales.'
                    }
                ]
            }
        ]
    };

    // Limpiar posts existentes
    forumPosts.innerHTML = '';
    
    if (postsData[forumId]) {
        postsData[forumId].forEach(post => {
            const postElement = createForumPostElement(post);
            forumPosts.appendChild(postElement);
        });
    }
}

// Función para crear elemento de post del foro
function createForumPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'forum-post';
    
    let repliesHtml = '';
    if (post.replies && post.replies.length > 0) {
        post.replies.forEach(reply => {
            repliesHtml += `
                <div class="reply">
                    <div class="post-header">
                        <strong><i class="fas fa-chalkboard-teacher"></i> ${reply.author}</strong>
                        <span class="post-date">${reply.date}</span>
                    </div>
                    <p class="post-content">${reply.content}</p>
                </div>
            `;
        });
    }
    
    postDiv.innerHTML = `
        <div class="post-header">
            <strong><i class="fas fa-user"></i> ${post.author}</strong>
            <span class="post-date">${post.date}</span>
        </div>
        <p class="post-content">${post.content}</p>
        <button class="btn btn-secondary btn-small" onclick="toggleReplyForm(this)">
            <i class="fas fa-reply"></i> Responder
        </button>
        ${repliesHtml}
    `;
    
    return postDiv;
}

// Función para mostrar/ocultar formulario de respuesta
function toggleReplyForm(button) {
    const existingForm = button.parentElement.querySelector('.reply-form');
    
    if (existingForm) {
        existingForm.remove();
        button.innerHTML = '<i class="fas fa-reply"></i> Responder';
    } else {
        const replyForm = document.createElement('div');
        replyForm.className = 'reply-form';
        replyForm.innerHTML = `
            <div class="form-group">
                <textarea placeholder="Escribe tu respuesta..." rows="3" style="width: 100%; margin-top: 1rem;"></textarea>
            </div>
            <div style="margin-top: 0.5rem;">
                <button class="btn btn-primary btn-small" onclick="submitReply(this)">
                    <i class="fas fa-paper-plane"></i> Enviar
                </button>
                <button class="btn btn-secondary btn-small" onclick="cancelReply(this)" style="margin-left: 0.5rem;">
                    Cancelar
                </button>
            </div>
        `;
        
        button.parentElement.appendChild(replyForm);
        button.innerHTML = '<i class="fas fa-times"></i> Cancelar';
    }
}

// Función para enviar respuesta
function submitReply(button) {
    const textarea = button.parentElement.parentElement.querySelector('textarea');
    const content = textarea.value.trim();
    
    if (content) {
        // Aquí enviarías la respuesta al servidor
        showNotification('Respuesta enviada correctamente', 'success');
        
        // Cerrar formulario
        const replyForm = button.closest('.reply-form');
        replyForm.remove();
        
        // Restaurar botón de responder
        const replyButton = button.closest('.forum-post').querySelector('button');
        replyButton.innerHTML = '<i class="fas fa-reply"></i> Responder';
    } else {
        showNotification('Por favor escribe una respuesta', 'error');
    }
}

// Función para cancelar respuesta
function cancelReply(button) {
    const replyForm = button.closest('.reply-form');
    const replyButton = button.closest('.forum-post').querySelector('button');
    
    replyForm.remove();
    replyButton.innerHTML = '<i class="fas fa-reply"></i> Responder';
}

// Función genérica para mostrar modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        currentModal = modalId;
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Agregar animación de entrada
        setTimeout(() => {
            modal.classList.add('modal-show');
        }, 10);
    }
}

// Función genérica para cerrar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('modal-show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll del body
            currentModal = null;
        }, 300);
    }
}

// Función para inicializar formularios
function initializeForms() {
    // Formulario de subir tarea
    const uploadForm = document.querySelector('#uploadTaskModal .upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleTaskUpload(this);
        });
    }

    // Formulario de nuevo post en foro
    const forumForm = document.querySelector('#forumModal .forum-form');
    if (forumForm) {
        forumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForumPost(this);
        });
    }
}

// Función para manejar subida de tarea
function handleTaskUpload(form) {
    const fileInput = form.querySelector('#taskFile');
    const commentsTextarea = form.querySelector('#taskComments');
    
    if (!fileInput.files[0]) {
        showNotification('Por favor selecciona un archivo', 'error');
        return;
    }

    // Validar tipo de archivo
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const fileName = fileInput.files[0].name.toLowerCase();
    const isValidType = allowedTypes.some(type => fileName.endsWith(type));
    
    if (!isValidType) {
        showNotification('Solo se permiten archivos PDF, DOC o DOCX', 'error');
        return;
    }

    // Simular carga de archivo
    showLoadingButton(form.querySelector('.form-btn'));
    
    setTimeout(() => {
        showNotification('Tarea subida correctamente', 'success');
        closeModal('uploadTaskModal');
        form.reset();
        hideLoadingButton(form.querySelector('.form-btn'));
        
        // Actualizar la interfaz para mostrar que la tarea fue subida
        updateTaskStatus();
    }, 2000);
}

// Función para manejar nuevo post en foro
function handleForumPost(form) {
    const textarea = form.querySelector('#newForumPost');
    const content = textarea.value.trim();
    
    if (!content) {
        showNotification('Por favor escribe un mensaje', 'error');
        return;
    }

    // Simular envío de post
    showLoadingButton(form.querySelector('.form-btn'));
    
    setTimeout(() => {
        showNotification('Post publicado correctamente', 'success');
        textarea.value = '';
        hideLoadingButton(form.querySelector('.form-btn'));
        
        // Agregar el nuevo post a la lista
        addNewPostToForum(content);
    }, 1500);
}

// Función para agregar nuevo post al foro
function addNewPostToForum(content) {
    const forumPosts = document.getElementById('forumPosts');
    const currentDate = new Date().toLocaleString('es-ES');
    
    const newPost = {
        author: 'Tú',
        date: currentDate,
        content: content,
        replies: []
    };
    
    const postElement = createForumPostElement(newPost);
    forumPosts.insertBefore(postElement, forumPosts.firstChild);
}

// Función para actualizar estado de tarea
function updateTaskStatus() {
    // Aquí actualizarías la interfaz para reflejar el nuevo estado
    // Por ejemplo, cambiar el botón de "Subir Tarea" a "Tarea Subida"
    console.log('Estado de tarea actualizado');
}

// Función para mostrar botón de carga
function showLoadingButton(button) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
}

// Función para ocultar botón de carga
function hideLoadingButton(button) {
    button.disabled = false;
    // Restaurar texto original basado en el contexto
    if (button.closest('#uploadTaskModal')) {
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Tarea';
    } else if (button.closest('#forumModal')) {
        button.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar';
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar estilos CSS si no existen
    addNotificationStyles();
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('notification-show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Función para obtener icono de notificación
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Función para agregar estilos de notificación
function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 400px;
        }
        
        .notification-show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-success {
            background: #4EAF32;
            color: white;
        }
        
        .notification-error {
            background: #E30612;
            color: white;
        }
        
        .notification-warning {
            background: #F58801;
            color: white;
        }
        
        .notification-info {
            background: #007CC6;
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100px);
            }
            
            .notification-show {
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Función para marcar módulo como completado
function markModuleAsCompleted() {
    // Simular marcado como completado
    showNotification('Módulo marcado como completado', 'success');
    closeModal('moduleDetailsModal');
    
    // Aquí actualizarías la interfaz del dashboard
    updateModuleProgress();
}

// Función para actualizar progreso del módulo
function updateModuleProgress() {
    // Actualizar la interfaz para reflejar el progreso
    console.log('Progreso del módulo actualizado');
}

// Exponer funciones globales necesarias
window.openModuleDetailsModal = openModuleDetailsModal;
window.openUploadTaskModal = openUploadTaskModal;
window.viewTaskFeedback = viewTaskFeedback;
window.openForumModal = openForumModal;
window.closeModal = closeModal;
window.toggleReplyForm = toggleReplyForm;
window.submitReply = submitReply;
window.cancelReply = cancelReply;
window.markModuleAsCompleted = markModuleAsCompleted;