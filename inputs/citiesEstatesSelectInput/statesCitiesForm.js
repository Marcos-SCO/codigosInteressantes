async function states() {
  try {
    const $states = document.querySelector("#states");
    if (!$states) return;
    
    const data = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => response.json())
      .then((data) => data);
    
    data.forEach((state) => {
      $states.appendChild(new Option(state.nome, state.id));
    });
  } catch (error) {
    console.log(error);
  }
}

function cities() {
  const $states = document.querySelector("#states");
  const $cities = document.querySelector("#cities");

  if (!$states || !$cities) return;

  $states.addEventListener("change", async function (event) {
    try {
      const stateId = event.target.value;

      const data = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`)
        .then((response) => response.json())
        .then((data) => data);

      if (!data) return;

      $cities.length = 0;
      $cities.appendChild(new Option("Aguarde, carregando cidades"));

      setTimeout(() => {
        $cities.length = 0;
        $cities.appendChild(new Option("Escolha uma cidade"));
        
        data.forEach((city) => {
          $cities.appendChild(new Option(city.nome, city.id));
        });
      }, 1000);

      $cities.addEventListener("change", function () {
        const $btnSubmit = document.querySelector(".wpcf7-submit");
        if (!$btnSubmit) return;

        $btnSubmit.removeAttribute("disabled");
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
}

states();
cities();