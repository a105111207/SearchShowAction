$(document).ready(function () {
    //修改時間格式為中文
    moment.locale('zh-tw', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'Ah點mm分',
            LTS: 'Ah點m分s秒',
            L: 'YYYY-MM-DD',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日Ah點mm分',
            LLLL: 'YYYY年MMMD日ddddAh點mm分',
            l: 'YYYY-MM-DD',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日Ah點mm分',
            llll: 'YYYY年MMMD日ddddAh點mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (h, meridiem) {
            let hour = h;
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            const hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: function () {
                return this.minutes() === 0 ? '[今天]Ah[點整]' : '[今天]LT';
            },
            nextDay: function () {
                return this.minutes() === 0 ? '[明天]Ah[點整]' : '[明天]LT';
            },
            lastDay: function () {
                return this.minutes() === 0 ? '[昨天]Ah[點整]' : '[昨天]LT';
            },
            nextWeek: function () {
                let startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddA點整' : prefix + 'dddAh點mm';
            },
            lastWeek: function () {
                let startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
                return this.minutes() === 0 ? prefix + 'dddAh點整' : prefix + 'dddAh點mm';
            },
            sameElse: 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '幾秒',
            m: '1 分鐘',
            mm: '%d 分鐘',
            h: '1 小時',
            hh: '%d 小時',
            d: '1 天',
            dd: '%d 天',
            M: '1 個月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    //載入時間、地區選單裡面的選單資料
    readyrun();
    function readyrun() {
        apply_date_mm();
        apply_city();
    }

    // 分辨 時間
    function check_date(index, state) {
        result_train = moment()
            .add(index, 'days')
            .format('YYYY/MM/DD')

        if (state) {
            result_train = moment()
                .add(index, 'days')
                .format('YYYY/MM/DD')
        }

        return result_train;
    }
    //顯示時間
    function apply_date_mm() {
        let date = document.querySelector('#date');
        let str = '<option value="請選擇日期">請選擇日期</option>';
        for (let i = 0; i < 90; i++) {
            str += `
            <option value="${check_date(i, true)}">${check_date(i, false)}</option>
            `;
        }
        date.innerHTML = str;
        rideDate = moment().format('YYYY') + '/' + check_date(0, true);
    }

    //顯示地區
    function apply_city() {
        let locationName = document.querySelector('#locationName');
        let str = '<option value="請選擇地區">請選擇地區</option>';
        str += `<option value="臺北市">臺北市</option>`;
        str += `<option value="新北市">新北市</option>`;
        str += `<option value="基隆市">基隆市</option>`;
        str += `<option value="桃園市">桃園市</option>`;
        str += `<option value="新竹市">新竹市</option>`;
        str += `<option value="新竹縣">新竹縣</option>`;
        str += `<option value="苗栗縣">苗栗縣</option>`;
        str += `<option value="臺中市">臺中市</option>`;
        str += `<option value="彰化縣">彰化縣</option>`;
        str += `<option value="南投縣">南投縣</option>`;
        str += `<option value="雲林縣">雲林縣</option>`;
        str += `<option value="嘉義市">嘉義市</option>`;
        str += `<option value="嘉義縣">嘉義縣</option>`;
        str += `<option value="臺南市">臺南市</option>`;
        str += `<option value="高雄市">高雄市</option>`;
        str += `<option value="屏東縣">屏東縣</option>`;
        str += `<option value="宜蘭縣">宜蘭縣</option>`;
        str += `<option value="花蓮縣">花蓮縣</option>`;
        str += `<option value="臺東縣">臺東縣</option>`;
        str += `<option value="澎湖縣">澎湖縣</option>`;
        str += `<option value="金門縣">金門縣</option>`;
        locationName.innerHTML = str;
    }

    //將查詢好的資料加入#employee的表格中
    function append_table(tr, item) {
        tr = $(`<tr class="animated fadeInLeft" style="animation-delay:0.${item}s"/>`);
        tr.append('<td>' + item.title + '</td>');
        //將\r、\\r、\n、\\n用空白值取代
        item.descriptionFilterHtml = item.descriptionFilterHtml.replace("\\*r\\*n", "");
        tr.append('<td>' + item.descriptionFilterHtml + '</td>');
        tr.append('<td>' + item.masterUnit + '</td>');
        tr.append('<td>' + item.startDate + '</td>');
        tr.append('<td>' + item.endDate + '</td>');
        tr.append('<td>' + item.showInfo[0].location + '</td>');
        tr.append('<td>' + item.showInfo[0].locationName + '</td>');
        //檢查是否售票，再依有沒有寫售價將資料放進欄位
        if (item.showInfo[0].onSales == "Y") {
            if (item.showInfo[0].price != "") {
                tr.append('<td>' + item.showInfo[0].price + '</td>');
            } else {
                tr.append('<td>價請詳閱相關網站</td>');
            }
        } else {
            tr.append('<td>免費</td>');
        }

        $('#emp_body').append(tr);
    }

    function search(tr, search_key, item) {
        if (search_key != "") {
            let reg = new RegExp(search_key, "");
            if ((item.title).match(reg) != null) {
                append_table(tr, item);
            } else if ((item.descriptionFilterHtml).match(reg) != null) {
                append_table(tr, item);
            } else if ((item.showInfo[0].location).match(reg) != null) {
                append_table(tr, item);
            } else if ((item.showInfo[0].locationName).match(reg) != null) {
                append_table(tr, item);
            }
        } else {
            append_table(tr, item);
        }
    }

    //搜尋按鈕查詢Json資料
    $('#search_action').click(function () {
        let sel_date = document.querySelector('#date');
        let sel_locationName = document.querySelector('#locationName');
        let date = moment(sel_date.value, 'YYYY-MM-DD');
        let locationName = sel_locationName.value;
        let tr = $('#emp_body').html('');
        let search_key = document.getElementById('search_key').value;
        $.ajax({
            url: 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            type: 'GET',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function () {
                alert("資料擷取失敗");
            },
            success: function (data) {
                $("#result").empty();
                if (sel_date.value == "請選擇日期") {
                    if (locationName == "請選擇地區") {
                        for (const item of data) {
                            search(tr, search_key, item);
                        }
                    } else {
                        let reg = new RegExp(locationName, "");
                        for (const item of data) {
                            if ((item.showInfo[0].location).match(reg) != null) {
                                search(tr, search_key, item);
                            }
                        }
                    }
                }

                if (date != "請選擇日期") {
                    if (locationName == "請選擇地區") {
                        for (const item of data) {
                            if (moment(date).isBetween(moment(item.startDate, 'YYYY-MM-DD'), moment(item.endDate, 'YYYY-MM-DD')) || moment(date).isBefore(moment(item.showInfo[0].endTime, 'YYYY-MM-DD'))) {
                                search(tr, search_key, item);
                            }
                        }
                    } else {
                        let reg = new RegExp(locationName, "");
                        for (const item of data) {
                            if (moment(date).isBetween(moment(item.startDate, 'YYYY-MM-DD'), moment(item.endDate, 'YYYY-MM-DD')) || moment(date).isBefore(moment(item.showInfo[0].endTime, 'YYYY-MM-DD'))) {
                                if ((item.showInfo[0].location).match(reg) != null) {
                                    search(tr, search_key, item);
                                }
                            }
                        }
                    }
                }
            }
        });
    })

})