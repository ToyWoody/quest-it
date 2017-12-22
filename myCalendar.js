/* global $ */
/*
<table class="table table-bordered text-center" style="table-layout:fixed;">
  <tbody>
    <tr>
      <td><span href="#" class="glyphicon glyphicon-chevron-left"></span></td>
      <td colspan="5" class="text-center">December 2017</td>
      <td><span href="#" class="glyphicon glyphicon-chevron-right"></span></td>
    </tr>
    <tr class="success">
      <td>Sun</td>
      <td>Mon</td>
      <td>Tue</td>
      <td>Wed</td>
      <td>Thu</td>
      <td>Fri</td>
      <td>Sat</td>
    </tr>

    <tr class="calendar-day">
      <td><h5>1</h5><h6 class="text-muted">23개</h6></td>
    </tr>
  </tbody>
</table>
*/

//jquery 프로퍼티 함수 추가.
$.fn.woody_calendar = function(){
  var $calendarElement = $(this);

  var labels = {
      month_labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dow_labels: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  };

  var option = getDefault();
  initCalendar();

  function getDefault(){
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      return {
          year : year,
          month : month
      };
  }

  function initCalendar(){
      var initYear = option.year;
      var initMonth = option.month - 1;

      $tableObj = $("<table class='table table-bordered text-center' style='table-layout:fixed;'></table>");
      $tableBody = $("<tbody></tbody>");
      // draw appendMonthHeader
      $monthHeaderObj = $("<tr></tr>");
      $prevMonthNav = $("<td><span class='glyphicon glyphicon-chevron-left' o></span></td>");
      $currentMonthLabel = $("<td colspan='5' class='text-center'></td>");
      $nextMonthNav = $("<td><span class='glyphicon glyphicon-chevron-right'></span></td>");

      drawMonthLabel($currentMonthLabel, initYear, initMonth);
	  
      $monthHeaderObj.append($prevMonthNav);
      $monthHeaderObj.append($currentMonthLabel);
      $monthHeaderObj.append($nextMonthNav);

      // draw appendDayOfWeekHeader
      $dayOfWeekHeadrObj = $("<tr class='success'></tr>");
      for(var i=0; i<7; i++){
        var dayOfWeek = labels.dow_labels[i];
        $dayOfWeekHeadrObj.append("<td>" + dayOfWeek + "</td>");
      }
	  
      $tableBody.append($monthHeaderObj);
      $tableBody.append($dayOfWeekHeadrObj);
      // draw appendDaysOfMonth
      drawDayOfMonth($tableBody, initYear, initMonth);
	 	
	  $prevMonthNav.click(function(e){
		  initMonth -= 1;
		  if(initMonth == -1){
			  initMonth = 11;
			  initYear -= 1;
		  }
		  drawMonthLabel($currentMonthLabel, initYear, initMonth);
		  drawDayOfMonth($tableBody, initYear, initMonth);
	  });
	  
	  $nextMonthNav.click(function(e){
		  initMonth += 1;
		  if(initMonth == 12){
			  initMonth = 0;
			  initYear += 1;
		  }
		  drawMonthLabel($currentMonthLabel, initYear, initMonth);
		  drawDayOfMonth($tableBody, initYear, initMonth);
	  });
	  
      $tableObj.append($tableBody);
      $calendarElement.append($tableObj);
  }

  function drawMonthLabel($currentMonthLabel, year, month){
    $currentMonthLabel.empty();
    $currentMonthLabel.append(year + ' ' + labels.month_labels[month]);
  }

  function drawDayOfMonth($tableBody, year, month){
      $tableBody.find('.calendar-day').remove();
      var weeksInMonth = calcWeeksInMonth(year, month);
      var lastDayinMonth = calcLastDayInMonth(year, month);
      var firstDow = calcDayOfWeek(year, month, 1);
      var lastDow = calcDayOfWeek(year, month, lastDayinMonth);
      var currDayOfMonth = 1;
	  var today = new Date();

      for (var wk = 0; wk < weeksInMonth; wk++) {
		  var $dowRow = $('<tr class="calendar-day"></tr>');
          for (var dow = 0; dow < 7; dow++) {
              if (dow < firstDow || currDayOfMonth > lastDayinMonth) {
                  $dowRow.append('<td></td>');
              } else {
				  var $dowElement = $('<td><h5>' + currDayOfMonth + '</h5></td>');
				  if(today.getFullYear() == year
					&& today.getMonth() == month
					&& today.getDate() == currDayOfMonth){
					  console.log("today");
					  $dowElement.addClass("today");
				  }
                  $dowRow.append($dowElement);
                  currDayOfMonth++;
              }
              if (dow == 6) {
                  firstDow = 0;
              }
          }
          $tableBody.append($dowRow);
      }
  }

  // Helper functions
  function calcWeeksInMonth(year, month) {
      var daysInMonth = calcLastDayInMonth(year, month);
      var firstDow = calcDayOfWeek(year, month, 1);
      var lastDow = calcDayOfWeek(year, month, daysInMonth);
      var days = daysInMonth;
      var correct = (firstDow - lastDow);
      if (correct > 0) {
          days += correct;
      }
      return Math.ceil(days / 7);
  }

  function calcLastDayInMonth(year, month) {
      var day = 28;
      while (checkValidDate(year, month + 1, day + 1)) {
          day++;
      }
      return day;
  }

  function calcDayOfWeek(year, month, day) {
      var dateObj = new Date(year, month, day, 0, 0, 0, 0);
      var dow = dateObj.getDay();
      if (dow == 0) {
          dow = 6;
      } else {
          dow--;
      }
      return dow;
  }
	
  function checkValidDate(y, m, d) {
      return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
  }

  return this;
}

// window.onload 를 대처하는 방법
jQuery(document).ready(function(){
  $("div#my-calendar").woody_calendar();
});
