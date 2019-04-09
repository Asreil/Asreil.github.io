const form = document.querySelector(".main__form .form"),
      toNextStep = $(".to-step .next"),
      toPreviousStep = $(".to-step .backward"),
      radio = $(".custom-radio input[type='radio']");

const toggleRadio = name => {
  const items = form.elements[name];
  
  for (let i = 0; i < items.length; i++) {
    const label = items[i].closest(".custom-radio");
    
    if (items[i].checked) {
      label.classList.toggle("active", true);
    } else label.classList.toggle("active", false);
  }
};

toNextStep.on("click", event => {
  event.preventDefault();
  
  $.ajax({
    type: "POST",
    url: window.location.href,
    data: form.serialize(),
    success: function() {
      console.log("Data was successfuly sent");
    },
    error: function(response) {
      console.log("Server responsed with status: " + response.status);
    }
  });
});

toPreviousStep.on("click", event => {
  event.preventDefault();
  
  $.ajax({
    type: "GET",
    url: window.location.href + "/back",
    success: function(response) {
      form.innerHTML = response.content;
    },
    error: function(response) {
      console.log("Server responsed with status: " + response.status);
    }
  });
});

radio.on("change", function() {
  toggleRadio($(this).prop("name"));
});