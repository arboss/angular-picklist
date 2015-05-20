#Angular Picklist
Angular component mildly inspired by [Primeface's PickList](http://www.primefaces.org/showcase/ui/data/pickList.xhtml).

There is one important feature to be mentioned: lists are searchable :)

##Prerequisities
- Angular 1.3
- Zurb Foundation (3/4/5)
    + (Markup uses Foundation classes, but can be ignored)
- Lodash

##Installation
```
bower install https://github.com/arboss/angular-picklist.git
```

##Usage

include CSS and Javascript:

 ```
 <link href="angular-picklist.css" rel="stylesheet"/>
 <script src="angular-picklist.js"></script>
  ```

**Important note:** angular-picklist.js must be loaded **after** angular and lodash (and angular must be loaded before lodash...)

```
<picklist left-list-rows="leftList" right-list-rows="rightList"/>
```

Load angular module *picklist*, such as:

```
 var app = angular.module('ngApp', ['picklist']);
```


Additional parameters (optional)

- show-move-all-buttons - show/hide move all buttons; default is true
- display - a function that returns the label to be used for each object

Advanced usage with all the perks:

```
<script type="text/javascript">
function transformFunc(e)
{
    return e.name;
}
</script>

<picklist left-list-rows="leftList" right-list-rows="rightList" show-move-all-buttons="false" display="transformFunc"/>
```
