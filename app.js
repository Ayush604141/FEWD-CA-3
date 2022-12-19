// Getting the required Elements from HTML.
const Button = document.getElementById('searchbutton');
const ModalBox = document.getElementById('ingredient');
var ButtonClickCount = 0;

// Implementing Random image onload and onclick Ingredient display.
window.onload = () => {
    const RandomFood = document.getElementById('random-food');
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then((res)=>{
        const NewFoodImage = document.createElement('img');
        const src = res.data.meals[0].strMealThumb;
        NewFoodImage.setAttribute('src',src);
        NewFoodImage.setAttribute('height','400px');
        const NewFoodName = document.createElement('h3');
        NewFoodName.innerText = res.data.meals[0].strMeal;
        RandomFood.append(NewFoodImage);
        RandomFood.append(NewFoodName);
        NewFoodImage.onclick = () => {
            ModalBox.innerHTML = "";
            for(let i=1;i<=20;i++){
                let key = `strIngredient${i}`;
                if(res.data.meals[0].hasOwnProperty(key)){
                    if(res.data.meals[0][key]!=null && res.data.meals[0][key]!=""){
                        ModalBox.innerHTML += res.data.meals[0][key] + `<br>`
                    }
                }
            }
            const Image = document.createElement('img');
            Image.setAttribute('src','./assets/Chef.png');
            Image.setAttribute('height','250px');
            ModalBox.append(Image);
            document.getElementById('ingredientModal').style.display = 'block';
        }
        window.onclick = function(e){
            if(e.target == document.getElementById('ingredientModal')){
                document.getElementById('ingredientModal').style.display = 'none';
            }
        }
    }).catch(()=>{
        console.log('Nothing happended')
    })
}


// Implementing the Search function for food type and onclick ingredient modal.
Button.onclick = () => 
{
    const GridElement = document.getElementById('FoodGrid');
    let Value = document.getElementById('foodsearch').value;
    if(Value == "")
    {
        alert('Please input a food type.')
    }
    else{
        alert('Scroll down for results');
        GridElement.innerHTML = "";
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Value}`).then((res)=>{
            let Data = res.data.meals;
            Data.forEach((FoodNow)=>{
                const FoodElement = document.createElement('div');
                FoodElement.setAttribute('id','FoodElement');
                const FoodName = document.createElement('h2');
                FoodName.innerText = FoodNow.strMeal;
                const FoodImage = document.createElement('img');
                FoodImage.setAttribute('src',FoodNow.strMealThumb);
                FoodImage.setAttribute('height','250px')
                FoodElement.append(FoodName);
                FoodElement.append(FoodImage);
                GridElement.append(FoodElement);
                FoodImage.onclick = () => {
                    ModalBox.innerHTML = "";
                    for(let i=1;i<=20;i++)
                    {
                        let key = `strIngredient${i}`;
                        if(res.data.meals[0].hasOwnProperty(key)){
                            if(FoodNow[key]!=null && FoodNow[key]!="")
                            {
                                ModalBox.innerHTML += FoodNow[key] + `<br>`
                            }
                        }
                    }
                    const Image = document.createElement('img');
                    Image.setAttribute('src','./assets/Chef.png');
                    Image.setAttribute('height','250px');
                    ModalBox.append(Image);
                    document.getElementById('ingredientModal').style.display = 'block';
                }
                window.onclick = function(e){
                    if(e.target == document.getElementById('ingredientModal'))
                    {
                        document.getElementById('ingredientModal').style.display = 'none';
                    }
                }
            })
            }).catch((e)=>{
                GridElement.style.display = 'block';
                GridElement.style.textAlign = 'center';
                GridElement.innerHTML = 'No Search Results.';
                GridElement.style.fontFamily = "'Martian Mono', monospace";
                GridElement.style.fontSize = '30px';
                console.log('No Results.');
            })
        }
    }