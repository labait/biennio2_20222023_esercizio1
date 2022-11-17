const lightOrDark = (color)  => {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
}



const loadAndParseData = () => {
  fetch('./data.json')
  .then(response => response.json() )
  .then((json) => {
    data = json; // data variable in global scope is set = json from fetch 
    const list = document.getElementById("section-words");
    for(var i in json.students){
      const student = json.students[i]
      list.innerHTML += `<div class="section__word" data-id="${i}"><span>${student.firstname} ${student.lastname}</span></div>`
    }
    init()
  })
}


const init = () => {
  $('body').removeClass('loading');

  gsap.to('.loader', {alpha: 0, duration: 1, delay: 0.25, ease: Power2.easeOut})
  gsap.from('.main-header nav .link-wrapper', {opacity: 0, y: 30, duration: 1, delay: 1, stagger: 0.15 })
  gsap.from('.section__word', {opacity: 0, rotation: '5deg', scale: 2, y: 60, duration: 1, delay: 1, stagger: 0.15 })

  $('.section__word').on('click', function(){ // here's different to use function of this, we'll explain it later :-) 
    const id = parseInt($(this).data("id"));
    const student = data.students[id];
    console.log(student);

    var person_name = `${student.firstname} ${student.lastname}`;
    $('.section--people').css('background', student.color)
    $('.section--people').addClass(lightOrDark(student.color))
    $('.section--people').addClass('show')
    $('.section--people .person-name').html(person_name)

    // #todo
    //$('.section--people .person-avatar').attr('src', student.image) 
    //...
  })

  $('.toggle-close').on('click', () => {
    $('.section--people').removeClass('show').removeClass('dark').removeClass('light')
  })

  $('.toggle-off-canvas').on('click', () => {
    $('.section--off-canvas').toggleClass('show')
    $(this).toggleClass('active')
  })
}

let data;
document.addEventListener("DOMContentLoaded", loadAndParseData)
