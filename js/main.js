const init = () => {

  $('body').removeClass('loading');

  gsap.to('.loader', {alpha: 0, duration: 1, delay: 0.25, ease: Power2.easeOut})
  gsap.from('.main-header nav .link-wrapper', {opacity: 0, y: 30, duration: 1, delay: 1, stagger: 0.15 })

  gsap.from('.section__word', {opacity: 0, rotation: '5deg', scale: 2, y: 60, duration: 1, delay: 1, stagger: 0.15 })

  //gsap.from('.section__word span', {opacity: 0, rotation: '5deg', y: 60, duration: 1, delay: 1.3, stagger: 0.15 })
  //gsap.from('.section__word span', {opacity: 0, duration: 1, delay: 1, stagger: 0.15 })

  $('.section__word').on('click', function() {
    var index = $(this).attr('data-count')
    var color = $(this).attr('data-color')
    var image = $(this).attr('data-image')

    // oppure
    var index = $(this).data('count')
    var color = $(this).data('color')
    var image = $(this).data('image')

    var person_name = $(this).text()

    $('.section--people .person-avatar').attr('src', image)

    $('.section--people').css('background', color)
    $('.section--people').addClass(lightOrDark(color))
    $('.section--people').addClass('show')
    $('.section--people .person-name').html(person_name)
  })

  $('.toggle-close').on('click', function(){
    $('.section--people').removeClass('show').removeClass('dark').removeClass('light')
  })

  $('.toggle-off-canvas').on('click', function(){
    $('.section--off-canvas').toggleClass('show')
    $(this).toggleClass('active')
  })
}


const parseData = (data) => {
  const list = document.getElementById("section-words");
  for(var i in data.students){
    const student = data.students[i]
    console.log(i)
    list.innerHTML += "<div class='section__word' data-count='"+i+"' student-id='"+student.id+"' data-color='#11a0d9' data-image='"+student.image+"'><span>"+student.firstname +" "+student.lastname+"</span></div>"
  }

  init()
}

document.addEventListener("DOMContentLoaded", () =>{
  fetch('./students.json')
  .then((response) => response.json())
  .then(parseData)
})


function lightOrDark(color) {
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
