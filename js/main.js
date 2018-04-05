$(document).ready(function() {
  $("#call-to-action-button").on("click", toAnotherPage);
  $("#emailIcon").on("click", toEmailPage);
  $("#fbIcon").on("click", toFacebookPage);
});

const toAnotherPage = () => {
  const callToActionText = $("#call-to-action-button")
    .text()
    .trim();
  if (
    callToActionText === "Start Sharing" ||
    callToActionText === "Share Again"
  ) {
    toEmailPage();
  } else if (callToActionText === "Send" || callToActionText === "Share") {
    toThanksPage();
  }
};

const toEmailPage = () => {
  console.log("to email!");
  const capturedEmail = $("#startPageEmailInput input").val();
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // if (!regex.test(capturedEmail)) {
  //   alert("Please enter a valid email address");
  //   return;
  // }

  $(
    "#emailPageInputs, #linkToShare>div.d-none, #emailIcon, #fbIcon, #container-subtext"
  ).removeClass("d-none");
  $("#emailPageInputs>div>input[placeholder='To']").focus();
  $(
    "#infoMessage, #startPageEmailInput, #fbPageInput, #mobileImageOnTop, #call-to-action-button>i"
  ).addClass("d-none");
  $("#call-to-action-button>h2").html("Send");
  $("#emailAddressPaste").val(capturedEmail);

  switchIconColors("email");
  undoingChangedThingsFromHavingVisitedTheThanksPage();
};

const toThanksPage = () => {
  console.log("to thanks!");

  $("#call-to-action-button").blur();
  $("#call-to-action-button>h2").html("Share Again");
  $("#infoMessage")
    .html(
      "<p>Once your friend makes their first purchase of $35+, you'll find your $20 reward in your inbox.</p><p>Don't stop there! The more you share, the more rewards you'll get!</p>"
    )
    .removeClass("d-none");
  $("#container-largest-text").html("Thanks for sharing Morgan Ann");
  $(
    "#emailPageInputs, #linkToShare>div.d-none, #iconsContainer>div.d-none, #container-subtext, #fbPageInput, .fa-facebook-square"
  ).addClass("d-none");
  switchIconColors("thanks");
  updateBigImageOnSide();
};

const toFacebookPage = () => {
  console.log("to fb!");
  const personalMessageFromEmailInput = $(
    "#personalMessageFromEmailInput"
  ).val();

  $("#fbPageInput, .fa-facebook-square").removeClass("d-none");
  $("#copiedPersonalMessage").html(personalMessageFromEmailInput);
  $("#fbPageInput>textarea").focus();
  $("#call-to-action-button>h2").html("Share");
  $("#emailPageInputs").addClass("d-none");

  switchIconColors("fb");
  undoingChangedThingsFromHavingVisitedTheThanksPage();
};

const undoingChangedThingsFromHavingVisitedTheThanksPage = () => {
  $("#container-largest-text").html("Get $20 for every friend you refer");
  $("#container-subtext").removeClass("d-none");
  $("#infoMessage").addClass("d-none");
  updateBigImageOnSide();
};

const updateBigImageOnSide = () => {
  if (
    $("#call-to-action-button>h2").html() === "Send" ||
    $("#call-to-action-button>h2").html() === "Share"
  ) {
    $("#desktop-image>img").attr("src", "./img/MorganAnn_OverlayShare.png");
  } else {
    $("#desktop-image>img").attr("src", "./img/MorganAnn_OverlayThanks.png");
  }
};

unColorIcon = iconToUnColor => {
  $(`#${iconToUnColor}Icon > div > i`)
    .addClass("white-circle")
    .removeClass("colored-circle white-logo");
};

colorIcon = iconToColor => {
  $(`#${iconToColor}Icon > div > i`)
    .addClass("colored-circle white-logo")
    .removeClass("white-circle");
};

const switchIconColors = currentPage => {
  let otherPage;
  if (currentPage !== "thanks") {
    otherPage = currentPage === "email" ? "fb" : "email";
  }

  unColorIcon(otherPage);
  colorIcon(currentPage);

  // if (currentPage === "thanks") {
  //   const emailIconIsColored = $("#emailIcon > i.fa-stack-2x").hasClass(
  //     "colored-logo"
  //   );
  //   iconToUnColor = emailIconIsColored ? "email" : "fb";
  //   otherIcon = emailIconIsColored ? "fb" : "email";
  //   $(`#${iconToUnColor}Icon > i.fa-stack-2x`).addClass("d-none");
  //   $(`#${iconToUnColor}Icon > i.fa-stack-1x`)
  //     .addClass("white-circle colored-logo")
  //     .removeClass("fa-inverse");
  //   return;
  // }

  // $(`#${otherPage}Icon > i.fa-stack-2x`).removeClass("colored-logo");
  // $(`#${currentPage}Icon > i.fa-stack-1x`)
  //   .removeClass("white-circle colored-logo")
  //   .addClass("fa-inverse");
  // // $(`#${currentPage}Icon > i.fa-stack-2x`).removeClass("d-none");
  // $(`#${currentPage}Icon > i`).removeClass("d-none");

  // $(`#${currentPage}Icon > i.fa-stack-2x`).addClass("colored-logo");
  // $(`#${otherPage}Icon > i.fa-stack-1x`)
  //   .addClass("white-circle colored-logo")
  //   .removeClass("fa-inverse");
  // $(`#${otherPage}Icon > i.fa-stack-2x`).addClass("d-none");
};
