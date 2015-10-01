ZBase.registerView((function() {
  var query_mgr;
  var chart;

  var load = function(path) {
    query_mgr = EventSourceHandler();

    var page = $.getTemplate(
        "views/session_tracking",
        "zbase_session_tracking_main_tpl");

    var content = $.getTemplate(
        "views/session_tracking",
        "zbase_session_tracking_dashboard_tpl");

    var menu = SessionTrackingMenu(path);
    menu.render($(".zbase_content_pane .session_tracking_sidebar", page));
    $(".zbase_content_pane .session_tracking_content", page).appendChild(content);

    $.handleLinks(page);
    $.replaceViewport(page);

    render();
  };

  var destroy = function() {
    if (query_mgr) {
      query_mgr.closeAll();
    }

    if (chart) {
      chart.destroy();
    }
  };

  var render = function() {
    $.showLoader();

    var metric = $(".zbase_session_tracking_dashboard z-dropdown.metric").getValue();
    var time_window = $(".zbase_session_tracking_dashboard z-dropdown.time_window").getValue();
    var query_string = getQueryString(metric, time_window);

    var query = query_mgr.get(
      "sql_query",
      "/api/v1/sql_stream?query=" + encodeURIComponent(query_string));

    query.addEventListener('result', function(e) {
      query_mgr.close("sql_query");
      var data = JSON.parse(e.data);
      renderChart(data.results);
    });

    query.addEventListener('query_error', function(e) {
      query_mgr.close("sql_query");
    });

    query.addEventListener('error', function(e) {
      query_mgr.close("sql_query");
      console.log("error");
      //renderQueryError("Server Error");
    });

    query.addEventListener('status', function(e) {
      //renderQueryProgress(JSON.parse(e.data));
    });
  };

  var renderChart = function(results) {
    //REMOVEME
    var x_values = ["x", 1441108800000, 1441112400000, 1441116000000, 1441119600000, 1441123200000, 1441126800000];
    var y_values = ["Sessions", 31109, 29557, 27481, 24851, 27031, 29696];
    //REMOVEME END

    var chart_data = {
      x: x_values,
      y: y_values,
      colors: {"Sessions": "#3498db"}
    };
    chart = ZBaseC3Chart(chart_data);
    chart.renderTimeseries("dashboard_chart");

    $.hideLoader();
  };

  var getQueryString = function(metric, time_window) {
    switch (metric) {
      case "num_sessions":
        return "select TRUNCATE(time / 3600000000) * " + time_window +
        " as time, count(*) as num_sessions from 'sessions.last30d'" +
        "group by TRUNCATE(time / 3600000000) order by time asc;";
    }
  };


  return {
    name: "session_tracking_dashboard",
    loadView: function(params) { load(params.path); },
    unloadView: destroy,
    handleNavigationChange: load
  };

})());
