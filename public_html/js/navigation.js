var menuItems = new Array();
menuItems.push(new MenuItem("Snake", true));

writeNavigation();

function writeNavigation() {
    var nav = document.getElementById("nav");
    var build = "";
    for (var i = 0; i < menuItems.length; i++) {
        build += '<button class="navItem';
        
        if (!menuItems[i].enabled) {
            build += ' disabled';
        }
        
        build += '" name="game" value="' + menuItems[i].value + '"'
        
        if (!menuItems[i].enabled) {
            build += ' disabled';
        }
        
        build += '>&bull; <span>' + menuItems[i].name + '</span></button><br />';
    }
    nav.innerHTML = build;
}

function MenuItem(name, enabled) {
    this.name = name;
    this.value = name.toLowerCase();
    this.enabled = enabled;
}