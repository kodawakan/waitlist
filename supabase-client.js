document.addEventListener('DOMContentLoaded', () => {
  const supabaseUrl = 'https://cgpysxsddfovbkrttant.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncHlzeHNkZGZvdmJrcnR0YW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NTkzMzksImV4cCI6MjA3MjQzNTMzOX0.0YdjChyhueWCgHx2ViCdw4Ebw_zfPTMb2U8R_935cmQ';

  let supabaseClient;
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
  } else {
    console.error('Supabase client not found. Make sure the Supabase script is loaded before this script.');
    return;
  }

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const messageEl = document.createElement('p');
    messageEl.className = 'mt-4 text-lg';
    form.parentNode.appendChild(messageEl);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameInput = form.querySelector('input[type="text"]');
      const emailInput = form.querySelector('input[type="email"]');
      const submitButton = form.querySelector('button');

      const name = nameInput.value;
      const email = emailInput.value;

      if (!name || !email) {
        messageEl.textContent = 'Por favor, preencha todos os campos.';
        messageEl.style.color = '#fb2c36'; // Red
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      messageEl.textContent = '';

      try {
        const { error } = await supabaseClient
          .from('waitlist')
          .insert([{ name, email }]);

        if (error) {
          throw error;
        }

        form.style.display = 'none';
        messageEl.textContent = 'Obrigado por se inscrever! Em breve você receberá notícias.';
        messageEl.style.color = '#2E7D32'; // Green

      } catch (error) {
        messageEl.textContent = `Ocorreu um erro: ${error.message}`;
        messageEl.style.color = '#fb2c36'; // Red
        submitButton.disabled = false;
        submitButton.textContent = 'Entrar na lista de espera';
      }
    });
  });
});