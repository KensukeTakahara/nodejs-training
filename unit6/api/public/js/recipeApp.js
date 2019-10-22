$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("courses?format=json", data => {
      data.forEach(course => {
        $(".modal-body").append(
          `<div><span class="course-title">${course.title}<span><div>${course.description}</div></div>`
        );
      });
    });
  });
});
