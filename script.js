"use strict";
$(document).ready(function () {
    $('select').SumoSelect();

    const heightInput = $("#height");
    heightInput.on("input", () => {
        $("#height_range").slider("option", "value", heightInput.val())
    })
    $("#height_range").slider({
        range: "min",
        value: 450,
        min: 450,
        max: 650,
        create: function (event, ui) {
            const val = $(this).slider("value");
            heightInput.val(val);
            const handler = $("#height_range .ui-slider-handle");
            $(handler).attr("data-val", val);

            heightInput.attr({
                "max": $(this).slider("option", "max"),
                "min": $(this).slider("option", "min")
            });
        },
        slide: function (event, ui) {
            const val = ui.value;
            heightInput.val(val);
            const handler = $("#height_range .ui-slider-handle");
            $(handler).attr("data-val", val);
        },
        change: function (event, ui) {
            $("#height_range .ui-slider-handle").attr("data-val", ui.value);
        }
    });

    const handle_min = $("#weight_min");
    const handle_max = $("#weight_max");
    $("#weight_range").slider({
        range: true,
        min: 2000,
        max: 4000,
        values: [2000, 4000],
        create: function () {
            handle_min.attr({
                "max": $(this).slider("option", "max"),
                "min": $(this).slider("option", "min")
            });
            handle_max.attr({
                "max": $(this).slider("option", "max"),
                "min": $(this).slider("option", "min")
            });

            const minVal = $(this).slider("values", 0);
            const maxVal = $(this).slider("values", 1);
            handle_min.val(minVal);
            handle_max.val(maxVal);

            const handlers = $("#weight_range .ui-slider-handle");
            $(handlers[0]).attr("data-val", minVal);
            $(handlers[1]).attr("data-val", maxVal);
        },
        slide: function (event, ui) {
            const minVal = ui.values[0];
            const maxVal = ui.values[1];
            handle_min.val(minVal);
            handle_max.val(maxVal);

            const handlers = $("#weight_range .ui-slider-handle");
            $(handlers[0]).attr("data-val", minVal);
            $(handlers[1]).attr("data-val", maxVal);
        }
    });
    $("#birthday").inputmask();
    $("#calendar").datepicker({
        altField: "#birthday",
        changeYear: true,
        changeMonth: true,
        showOtherMonths: true
    });
    
    // Получение выбранной даты от календаря
    function getCurrentDate() {
        let date = $("#calendar").datepicker("getDate");
        return {
            "year": date.getFullYear(),
            "month": date.getMonth(),
            "day": date.getDate()
        }
    }

    // Установка даты для смены месяца и года
    function setDate(month, year) {
        const day = getCurrentDate().day;
        $("#calendar").datepicker("setDate", `${day}.${month}.${year}`);
    }

    // Смена заголовков месяца и года 
    function setYear(year) {
        yearPlace.text(year);
    }

    function setMonth(month) {
        monthPlace.text(MONTHS[month]);
    }

    const monthCtrls = $("#change_month .calendar__ctrl");
    const monthPicker = $(".ui-datepicker-month");
    const monthPlace = $(".calendar__month");
    const yearCtrls = $("#change_year .calendar__ctrl");
    const yearPicker = $(".ui-datepicker-year");
    const yearPlace = $(".calendar__year");
    const YEARS = {
        "min": yearPicker.children("option").first().val(),
        "max": yearPicker.children("option").last().val(),
    }
    const MONTHS = $("#calendar").datepicker("option", "monthNames");

    let currentYear = getCurrentDate().year;
    let currentMonth = getCurrentDate().month;
    setYear(currentYear);
    setMonth(currentMonth);

    // Переключение месяца
    monthCtrls.on("click", (e) => {
        const action = $(e.target).data("action");
        if (action === "decr" && currentMonth > 0) currentMonth--;
        else if (action === "incr" && currentMonth < 12) currentMonth++;

        // Отключение кнопок на границах
        if (currentMonth == 0) $(monthCtrls[0]).prop('disabled', true);
        else $(monthCtrls[0]).prop('disabled', false);
        if (currentMonth == 11) $(monthCtrls[1]).prop('disabled', true);
        else $(monthCtrls[1]).prop('disabled', false);

        setMonth(currentMonth);
        setDate(currentMonth, currentYear);
    })

    // Переключение года
    yearCtrls.on("click", (e) => {
        const action = $(e.target).data("action");
        if (action === "decr" && currentYear > YEARS.min) currentYear--;
        else if (action === "incr" && currentYear < YEARS.max) currentYear++;

        // Отключение кнопок на границах
        if (currentYear == YEARS.min) $(yearCtrls[0]).prop('disabled', true);
        else $(yearCtrls[0]).prop('disabled', false);
        if (currentYear == YEARS.max) $(yearCtrls[1]).prop('disabled', true);
        else $(yearCtrls[1]).prop('disabled', false);

        setYear(currentYear);
        setDate(currentMonth, currentYear);
    })

    // Установка примеров цвета в SumoSelect
    const colorFields = $(".form__input--color");
    colorFields.each(function () {
        const colors = $(this).find("option");
        const pickerOptions = $(this).find(".opt");
        const picker = $(this);
        pickerOptions.each(function(index){
            const colorElem = `<div class='color' style='background:${$(colors[index]).data("color")} '></div>`;
            $(this).prepend(colorElem);
            if($(this).hasClass("selected")){
                $(picker).find(".CaptionCont").prepend(colorElem);                
            }
        })
    });
});