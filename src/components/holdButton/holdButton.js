const holdButtonFactory = (cssClass) =>{
    let _htmlButton = document.createElement('button');
    let _cssClass = cssClass;
    let _defaultCssClass = "btn-secondary";
    let _pressed = false;
    let _onClickCallbacks = [];
    const _init = (width, height)=>{
        ["btn", _defaultCssClass].forEach((cssClass) =>{
            _htmlButton.classList.toggle(cssClass);
        });
        _htmlButton.style.width = `${width}px`;
        _htmlButton.style.height = `${height}px`;
        _htmlButton.addEventListener('click', _onClick)
    };
    const _onClick = ()=>{
        if(!_pressed){
            _toggleAppearance();
            _togglePressed();
            _onClickCallbacks.forEach((clickCallback)=>{
                clickCallback.call();
            })
        }
    };
    const _toggleAppearance = (cssClass = _cssClass, defaultCssClass = _defaultCssClass, pressed = _pressed)=>{
            _htmlButton.classList.toggle(defaultCssClass);
            _htmlButton.classList.toggle(cssClass)
    };
    const _togglePressed = ()=>{
        _pressed = true;
    };
    const setParent = (parentNode, childNode = _htmlButton ) =>{
        parentNode.appendChild(childNode);
    };
    const setIcon = (iconClasses)=>{
        let icon = document.createElement('i');
        iconClasses.forEach((cssClass)=>{
            icon.classList.toggle(cssClass);
        });
        _htmlButton.appendChild(icon);
    };
    const addClickFunction = (functionReference)=>{
        _onClickCallbacks.push(functionReference);
    };
    _init(50, 50);
    return {addClickFunction,setIcon,setParent}
};

module.exports = {
    holdButtonFactory:holdButtonFactory
};