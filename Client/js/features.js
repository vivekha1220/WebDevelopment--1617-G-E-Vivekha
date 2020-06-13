var featureLoading = document.getElementById("featureLoading");
var featureSubmitBtn = document.getElementById("featureSubmitBtn");
var featureFrm = document.getElementById("featureFrm");

featureSubmitBtn.addEventListener("click", async function() {
  featureLoading.classList.remove("human-hidden");
  featureFrm.classList.add("human-hidden");
  await onfeaturesubmit();
  featureFrm.reset();
  featureLoading.classList.add("human-hidden");
  featureFrm.classList.remove("human-hidden");
  await onfeatureload();
});

async function onfeatureload() {
  var response = await fetch("http://localhost:3000/api/features");
  var result = await response.json();
  var feature1 = result[0]; // accessing the first object inside the result array

  var featureList = document.getElementById("feature-list");

  featureList.innerHTML = "";

  for (var i = 0; i < result.length; i++) {
    var lielement = document.createElement("li");
    lielement.innerHTML =
      result[i].body +
      " " +
      '<span class="badge badge-success">' +
      result[i].author +
      ", " +
      result[i].time +
      "</span>";
    lielement.className = "list-group-item";
    featureList.appendChild(lielement);
  }
}

async function onfeaturesubmit() {
  await fetch("http://localhost:3000/api/features", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("suggested-name").value,
      feature: document.getElementById("suggested-feature").value
    })
  });
}

onfeatureload();
