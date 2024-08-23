document.addEventListener('DOMContentLoaded', () => {
    const loginUsuarioScreen = document.getElementById('login-usuario');
    const loginAdminScreen = document.getElementById('login-admin');
    const viewFaltasScreen = document.getElementById('view-faltas');
    const cadastroFaltasScreen = document.getElementById('cadastro-faltas');

    const entrarUsuarioBtn = document.getElementById('entrar-usuario');
    const entrarAdminBtn = document.getElementById('entrar-admin');
    const entrarAdminSubmitBtn = document.getElementById('entrar-admin-submit');
    const entrarComoUsuarioBtn = document.getElementById('entrar-como-usuario');
    const logoutBtn = document.getElementById('logout');
    const logoutAdminBtn = document.getElementById('logout-admin');

    const turnoSelect = document.getElementById('turno-select');
    const infoFaltas = document.getElementById('info-faltas');
    const registrarSalaBtn = document.getElementById('registrar-sala');
    const listaSalas = document.getElementById('lista-salas');

    let salas = [];
    let faltas = {};

    function switchScreen(screen) {
        loginUsuarioScreen.classList.remove('active');
        loginAdminScreen.classList.remove('active');
        viewFaltasScreen.classList.remove('active');
        cadastroFaltasScreen.classList.remove('active');
        screen.classList.add('active');
    }

    entrarUsuarioBtn.addEventListener('click', () => {
        switchScreen(viewFaltasScreen);
        updateInfoFaltas();
    });

    entrarAdminBtn.addEventListener('click', () => {
        switchScreen(loginAdminScreen);
    });

    entrarAdminSubmitBtn.addEventListener('click', () => {
        switchScreen(cadastroFaltasScreen);
    });

    entrarComoUsuarioBtn.addEventListener('click', () => {
        switchScreen(loginUsuarioScreen);
    });

    logoutBtn.addEventListener('click', () => {
        switchScreen(loginUsuarioScreen);
    });

    logoutAdminBtn.addEventListener('click', () => {
        switchScreen(loginUsuarioScreen);
    });

    registrarSalaBtn.addEventListener('click', () => {
        const nomeSala = document.getElementById('nome-sala').value;
        const qtdAlunos = document.getElementById('qtd-alunos').value;
        const turnoSala = document.getElementById('turno-sala').value;

        if (nomeSala && qtdAlunos && turnoSala) {
            const sala = {
                nome: nomeSala,
                qtd: parseInt(qtdAlunos),
                turno: turnoSala,
            };
            salas.push(sala);
            renderSalas();
        }
    });

    function renderSalas() {
        listaSalas.innerHTML = '';
        salas.forEach((sala, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${sala.nome} - ${sala.qtd} alunos - ${sala.turno}
                <button onclick="selecionarSala(${index})">Selecionar</button>
            `;
            listaSalas.appendChild(li);
        });
    }

    window.selecionarSala = (index) => {
        const sala = salas[index];
        const faltasSala = prompt(`Quantos alunos faltaram na sala ${sala.nome}?`);
        if (faltasSala !== null) {
            faltas[sala.nome] = parseInt(faltasSala);
            updateInfoFaltas();
        }
    };

    turnoSelect.addEventListener('change', updateInfoFaltas);

    function updateInfoFaltas() {
        const turno = turnoSelect.value;
        let presentes = 0;
        let totalFaltas = 0;
        let allFaltasRegistered = true;

        salas.forEach(sala => {
            if (sala.turno === turno) {
                if (faltas[sala.nome] === undefined) {
                    allFaltasRegistered = false;
                } else {
                    const faltasSala = faltas[sala.nome];
                    presentes += (sala.qtd - faltasSala);
                    totalFaltas += faltasSala;
                }
            }
        });

        if (allFaltasRegistered) {
            infoFaltas.innerText = `Presentes: ${presentes}, Faltas: ${totalFaltas}`;
        } else {
            infoFaltas.innerText = 'Por favor, registre as faltas de todas as turmas no turno selecionado.';
        }
    }

    switchScreen(loginUsuarioScreen);
});