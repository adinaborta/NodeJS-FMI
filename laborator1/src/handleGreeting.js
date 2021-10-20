const handleGreeting = ({ params, country }, response) => {
  if (!params.name) {
    response.send("Hello world!");
  } else {
    let message = "";
    if (country === "ROMANIA") {
      message = "Salut " + params.name;
    } else {
      message = "Hello " + params.name;
    }
    response.send(message);
  }
};

module.exports = handleGreeting;
