$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div><span class="course-cost">$${course.cost}</span><span>${
            course.title
          }</span><button class="${
            course.joined ? "joined-button" : "join-button"
          } btn btn-info btn-sn" data-id="${course._id}">${
            course.joined ? "Joined" : "Join"
          }</button><div>${course.description}</div></div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};

const socket = io();

$("#chatForm").submit(() => {
  let text = $("#chat-input").val(),
    userName = $("#chat-user-name").val(),
    userId = $("#chat-user-id").val();
  socket.emit("message", {
    content: text,
    userName,
    userId
  });
  $("#chat-input").val("");
  return false;
});

socket.on("message", message => displayMessage(message));

let displayMessage = message =>
  $("#chat").prepend(
    $("<li>").html(
      `<strong class="message ${getCurrentUserClass(message.user)}">${
        message.userName
      }</strong>: ${message.content}`
    )
  );

let getCurrentUserClass = id => {
  let userId = $("#chat-user-id").val();
  return userId === id ? "current-user" : "";
};

socket.on("load all messages", data => {
  data.forEach(message => {
    displayMessage(message);
  });
});
