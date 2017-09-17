<style>
  body {
    background-image: url({{ URL::to('src/img/404-limo.png') }});
    background-position: center;
    background-size: cover;
  }
  .error-div {
    position: absolute;
    top: 30vh;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .error-text {
    color: white;
    font-size: 36px;
    text-align: center;
  }
</style>

<div class="error-div">
  <p class="error-text">
  ¯\_(ツ)_/¯
  <br />
  Looks like we can't find that page.
  </p>
</div>
