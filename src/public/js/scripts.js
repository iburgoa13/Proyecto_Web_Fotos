$('#post-comment').hide();
$('#btn-toggle-comment').click( e =>{
    e.preventDefault();
    $('#post-comment').slideToggle();
})
$('#btn-like').click(function(e){
    e.preventDefault();
    let img = $(this).data('id');
    $.post('/images/'+ img +'/like')
            .done(data =>{
                
                $('.likes-count').text(data.likes);
            });
});

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this = $(this);
    const respuesta = confirm("¿Seguro de querer eliminar esta imagen?");
    if(respuesta){
        let img = $this.data('id');
       
        $.ajax({
            url:'/images/' +img,
            type:'DELETE'
        })
        .done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Eliminado</span>');
        });
    }
})