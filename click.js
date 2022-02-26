function post() {
    let data = {};
    for (let index = 0; index < formcount; index++)
    {
        let str = document.getElementById("name" + index).value;

        if (str != "")
        {
            data[str] = String.raw`${document.getElementById("value" + index).value}`;
        }
    }
    let urlstr = document.getElementById("url").value;
    if (urlstr != "")
    {
        const xml = new XMLHttpRequest();
        xml.open("POST", urlstr, false);
        xml.setRequestHeader("content-type", "application/json;charset=UTF-8");
        let datastr = JSON.stringify(data);
        datastr = datastr.replace(String.raw`\\n`, String.raw`\n`);
        datastr = datastr.replace(String.raw`\\\n`, String.raw`\\\\n`);
        console.log(datastr);
        xml.send(datastr);
        console.log(datastr);
    }
}

function update()
{
    let text = "";
    for (let index = 0; index < formcount; index++) {
        text = text + 'name:<input type="text" id="name' + index + '"/>value:<textarea id="value' + index + '"></textarea><br />';
    }
    document.getElementById("divbody").innerHTML = text;
}

function addcount()
{
    let tmp = getarray();

    formcount += 1;
    update();

    setarray(tmp);
}

function minuscount()
{
    if (formcount > 1) {
        let tmp = getarray();

        formcount -= 1;
        update();

        setarray(tmp);
    }
}

function clearcount()
{
    formcount = 1;
    update();
}

function getarray()
{
    let tmp = [];
    for (let index = 0; index < formcount; index++) {
        tmp[index] = [];
        tmp[index].name = document.getElementById("name" + index).value;
        tmp[index].value = document.getElementById("value" +
            index).value;
    }
    return tmp;
}

function setarray(tmp)
{
    for (index = 0; index < Math.min(tmp.length, formcount); index++) {
        document.getElementById("name" + index).value = tmp[index].name;
        document.getElementById("value" + index).value = tmp[index].value;
    }
}

function template(str)
{
    let templatearray = [];
    switch (str)
    {
        case "discord":
            templatearray = discord;
            break;
        default:
            return;
    }

    formcount = templatearray.length;
    update();
    setarray(templatearray);
}

const discord = [
    { name : "content", value : "message" },
    { name : "username", value : "username" },
    { name : "avatar_url", value : "" }];

let formcount = 1;