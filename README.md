# What's this
A package that allows you tooltip to show intelligently base on where it is

# Installation

`npm i smart-tooltip --save`

`optionally run npm init -y`

# Bundling your app

Html (index.html)

```
<head>
    <link rel="stylesheet" href="node_modules/smart-tooltip/main.css">
</head>
<body>
    <div class="smart-tooltip-container" > 
                Button 
        <span class="smart-tooltip">Welcome</span>  
    </div>
</body>
<script src="yourscript.js"></script>
```

Javascript (yourscript.js)

```
    import {smartTooltip} from "smart-tooltip";

    smartTooltip();
```

Bundling with Parcel (optional)

```
    run npm i parcel -g

    parcel index.html

```




## options
* Forcing tooltip to stay at particular position 
_ Apply class *stay-left | stay-right | stay-bottom | stay-top* _
eg:
```
    <div class="smart-tooltip-container" > 
                Button 
        <span class="smart-tooltip stay-right">Welcome</span>  
    </div>
```

* Have you run into the trouble of having your tooltip cut because of a parent container overflowed hidden? Dont worry, just add the class _overlay_ eg:
```
    <div class="smart-tooltip-container" > 
                Button 
        <span class="smart-tooltip stay-right overlay">Welcome</span>  
    </div>
```

*NB: TO PREVENT TROUBLES WITH OVERLAY .. PLEASE SPECIFY DEFINITE WITDH FOR TOOLTIP*

* Do you want the tooltip stick around for a while...?
    Add the stick class with the time in milliseconds (stick-100) you want it to stay.
    ```
     <button class="smart-tooltip-container">
            Button 
            <span class="smart-tooltip overlay stick-200">Tooltip</span>
        </button>
    ```
    Or may be you want to tooltip to stick around until you click anywhere else .. in that case just add the stick class eg:
    ```
     <button class="smart-tooltip-container">
            Button 
            <span class="smart-tooltip overlay stick">Tooltip</span>
        </button>
    ```

*Feel free to clone the github repo and import main.css and index.js to your project
<!-- smart-tooltip supports 2 options all of which are optional
* *type * - _hard | soft_ (Defaults to soft) -->