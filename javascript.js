//TODO:
//highlight coloring paranthesis when hovering names, titles or keywords

//load function contains all javascript code
window.addEventListener("load", function () {

    console.log(window.innerWidth);

    //create an array of random colors
    let highlight_colours = ["#BFA7E8", "#3B6D56", "#FC5D00", "#0062FE", "#62411F", "#818D71", "#91716e", "#6992b3"];

    //generate a ranom number according to the number of colors in the array (0 - (arraycount))
    let randomcolor = Math.floor(Math.random() * highlight_colours.length);

    //set root property to a random color
    document.querySelector(':root').style.setProperty('--main-highlight-color', highlight_colours[randomcolor]);

    //mobile variable
    let mobile;

    //mobile width
    let mobileWidth = 607;

    //desktop widths
    let desktopWidth1 = 400;
    let desktopWidth2 = 600;
    let desktopWidth3 = 1000;

    //desktopheight variables still need to be filled
    let desktopHeight1 = 350;
    let desktopHeight2 = 480;
    let desktopHeight3 = 700;

    let wordlimit = 65;


    console.log("width is " + window.innerWidth);
    console.log("height is " + window.innerHeight);

    //    initialisation of screensize variables on load
    if (window.innerWidth < mobileWidth) {
        mobile = true;
    }
    if (window.innerWidth > mobileWidth && window.innerWidth < desktopWidth1) {
        mobile = false;
        wordlimit = 10;
    }
    if (window.innerWidth > desktopWidth1 && window.innerWidth < desktopWidth2 || window.innerHeight > desktopHeight1 && window.innerHeight < desktopHeight2) {
        wordlimit = 15;
    }
    if (window.innerWidth > desktopWidth2 && window.innerWidth < desktopWidth3 || window.innerHeight > desktopHeight2 && window.innerHeight < desktopHeight3) {
        wordlimit = 20;
    }
    if (window.innerWidth > desktopWidth3 || window.innerHeight > desktopHeight3) {
        wordlimit = 35;
    }

    if ((window.innerWidth > desktopWidth2 && window.innerWidth < desktopWidth3) && window.innerHeight > desktopHeight3) {
        wordlimit = 20;
    }

    let previousWidth = window.innerWidth;
    let previousHeight = window.innerHeight;

    window.addEventListener("resize", function () {
        let currentWidth = window.innerWidth;
        let currentHeight = window.innerHeight;

        console.log("width is " + window.innerWidth);
        console.log("height is " + window.innerHeight);

        //all WIDTH resize-statements
        if (currentWidth !== previousWidth) {
            if (window.innerWidth < mobileWidth) {
                mobile = true;
            }
            if (window.innerWidth > mobileWidth && window.innerWidth < desktopWidth2) {
                mobile = false;
                wordlimit = 10;
            }
            if (window.innerWidth > desktopWidth2 && window.innerWidth < desktopWidth3) {
                wordlimit = 20;
            }
            if (window.innerWidth > desktopWidth3) {
                wordlimit = 35;
            }
        }
        //all HEIGHT resize-statements
        if (currentHeight !== previousHeight) {
            if (window.innerHeight > desktopHeight1 && window.innerHeight < desktopHeight2) {
                wordlimit = 5;
            }
            if (window.innerHeight > desktopHeight2 && window.innerHeight < desktopHeight3) {
                wordlimit = 15;
            }
            if (window.innerHeight > desktopHeight3) {
                wordlimit = 30;
            }
        }
        //all COMBINED resize-statements
        if ((window.innerWidth > desktopWidth2 && window.innerWidth < desktopWidth2) && window.innerHeight > desktopHeight3) {
            wordlimit = 20;
        }
        if ((window.innerWidth < desktopWidth1) && (currentHeight !== previousHeight)) {
            wordlimit = 5;
        }
        if ((window.innerWidth > desktopWidth1 && window.innerWidth < desktopWidth2) && (currentHeight !== previousHeight)) {
            wordlimit = 10;
        }

    })


    //HIGHLIGHTING CORRESPONDING THESES BASED ON THE FILTER MENU

    //Highlight the corresponding author/title in the running text when hovering in the menu
    document.querySelectorAll("li").forEach(function (li) {
        //show author
        document.querySelectorAll(".thesisAuthor").forEach(function (thesisAuthor) {
            li.addEventListener("mouseenter", function () {
                if (!mobile) {
                    //Highlight the corresponding author in the running text when hovering in the menu
                    if (li.textContent.includes(`${thesisAuthor.textContent.substring(3)}`)) {
                        thesisAuthor.parentNode.classList.add("visible");
                        //this concerts (...)
                        thesisAuthor.parentNode.nextSibling.classList.add("isvisible");
                    }

                    //Highlight all items in the running text that match the keyword
                    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
                        if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`)) {
                            thesisWrapper.classList.add("visible");
                            //this concerts (...)
                            thesisWrapper.nextSibling.classList.add("isvisible");
                            //                            thesisWrapper.closest(".elipsis").classList.add("visible");
                        }
                    })
                }
            })
            //            if (li.parentNode.classList.conains("keywordsList")) {
            li.addEventListener("mouseleave", function () {
                if (!mobile) {
                    //Remove highlight when not hovering
                    if (li.textContent.includes(`${thesisAuthor.textContent.substring(3)}`)) {
                        thesisAuthor.parentNode.classList.remove("visible");
                        //this concerts (...)
                        thesisAuthor.parentNode.nextSibling.classList.remove("isvisible");
                    }

                    //Remove all items in the running that match the keyword
                    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
                        if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`)) {
                            thesisWrapper.classList.remove("visible");
                            //this concerts (...)
                            thesisWrapper.nextSibling.classList.remove("isvisible");
                        }
                    })
                }
            })
            //            }



            //this locks the highlighting of the keywords and their corresponding items 

            li.addEventListener("click", function () {
                document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {

                    //check if the textcontent of the filter matches the classname of the corresponding theses. the OR statement is neccessary incase it has the "X " attached to it. The "replace(/ .*/,'')" deletes everything after the first word, sothat only the first word is checked—which corresponds to the classname.
                    if (thesisWrapper.classList.contains(`${li.textContent.replace(/ .*/,'').toLowerCase()}`) || thesisWrapper.classList.contains(`${li.textContent.substring(2).replace(/ .*/,'').toLowerCase()}`)) {
                        thesisWrapper.classList.toggle("clickHighlighted");
                    }
                })
                if (li.parentNode.classList.contains("keywordsList")) {

                    if (!(Array.from(li.textContent)[0] == "X")) {
                        li.firstChild.textContent = "X " + li.textContent;
                        li.firstChild.classList.add("selected");
                        //                        console.log(`<span class="Tag"> X ${li.textContent}</span>`);
                        //                        li.innerHTML = `<span class="Tag">X ${li.textContent}</span>`
                    } else if ((Array.from(li.textContent)[0] == "X")) {
                        li.firstChild.textContent = li.textContent.substring(2);
                        li.firstChild.classList.remove("selected");
                    }
                }
            })
        })

        //show title
        document.querySelectorAll(".thesisTitle").forEach(function (thesisTitle) {
            li.addEventListener("mouseenter", function () {
                if (!mobile) {
                    //Highlight the corresponding title in the running text when hovering in the menu
                    if (li.textContent.includes(`${thesisTitle.textContent.substring(0,9)}`)) {
                        thesisTitle.parentNode.classList.toggle("visible");
                        thesisTitle.parentNode.nextSibling.classList.add("isvisible");
                    }
                }
            })
            li.addEventListener("mouseleave", function () {
                if (!mobile) {
                    //Remove highlight when not hovering
                    if (li.textContent.includes(`${thesisTitle.textContent.substring(0,9)}`)) {
                        thesisTitle.parentNode.classList.toggle("visible");
                        thesisTitle.parentNode.nextSibling.classList.remove("isvisible");
                        //                        thesisTitle.closest(".elipsis").classList.remove("isvisible");
                    }
                }
            })
        })



        //style all filteritem authors in bold
        if (document.querySelector(".authorList").contains(li)) {
            li.style.fontWeight = "bold";
        }
        //style all filteritem titles in italic
        if (document.querySelector(".titleList").contains(li)) {
            li.style.fontStyle = "italic";
        }
    })



    //HIDING AND SHOWING THE DROP(UP) MENU ON HOVER

    //this variable will be needed to check if the cursor has entered the listItems
    let mouseneterVariable = false;

    document.querySelector(".allList").style.height = 0;

    document.querySelectorAll("h3").forEach(function (h3) {
        h3.addEventListener("mouseenter", function () {
            //only do this on desktop, otherwise the mouseenter eventlistener breaks things, as if it were a click
            if (!mobile) {

                document.querySelectorAll("ul div").forEach(function (listBlocks) {
                    //first, hide all lists when a filterbutton is hovered, to clear 
                    listBlocks.style.display = "none";
                    listBlocks.addEventListener("mouseleave", function () {
                        //also hide all on mouseleave 
                        listBlocks.style.display = "none";
                    })
                })
                //show the corresponding list of the filterbutton on mouseenter 
                document.querySelector(`.${h3.classList[0]}List`).style.display = "block";
                setTimeout(() => {
                    //this here is only wrapped in a settimeout sothat the opacity animation works 
                    document.querySelector(`.${h3.classList[0]}List`).style.opacity = "1";
                    document.querySelector(`.${h3.classList[0]}List`).style.left = h3.getBoundingClientRect().left + "px";
                }, 10);
            }
        })
    })

    //This could probably be merged with the top function
    document.querySelectorAll("h3").forEach(function (h3) {
        //        document.querySelector("ul.allList").style.height = "0";
        h3.addEventListener("mouseleave", function () {
            //only do this on desktop, otherwise the mouseenter eventlistener breaks things, as if it were a click
            if (!mobile) {
                document.querySelectorAll("ul div").forEach(function (listBlocks) {
                    //this settimeout gives the user some time to start hivering the listitems, before they disappear 
                    let timer = setTimeout(() => {
                        document.querySelectorAll("li").forEach(function (lis) {
                            lis.addEventListener("mouseenter", function () {
                                //change the mouseneterVariable to true on mouseenter; this will cause the settimeout function to be interrupted
                                mouseneterVariable = true;
                            })
                        })
                        document.querySelectorAll("ul div").forEach(function (lis) {
                            lis.addEventListener("mouseleave", function () {
                                //change mouseneterVariable back to false on mouseleave
                                mouseneterVariable = false;
                            })
                        })

                        if (mouseneterVariable == true) {
                            //clear the setInterval function if the user hovers a listitem, preventing the listmenu from closing
                            clearInterval(timer);
                        } else {
                            //else, close the menu afeter 200ms
                            document.querySelector(`.${h3.classList[0]}List`).style.display = "none";
                        };
                    }, 200);
                })
            }
        })
    })


    //update positioning of filteritems on resize
    window.addEventListener("resize", function () {
        if (!mobile) {
            document.querySelector(".authorList").style.left = document.querySelector("h3.author").getBoundingClientRect().left + "px";
            document.querySelector(".titleList").style.left = document.querySelector("h3.title").getBoundingClientRect().left + "px";
            document.querySelector(".keywordsList").style.left = document.querySelector("h3.keywords").getBoundingClientRect().left + "px";
        }
    })


    //show & Hide "Website Created by Lara Dautun & Patrick Hutchinson
    document.querySelector(".creatorInfo").addEventListener("mouseenter", function () {
        document.querySelector(".creatorInfoContent").classList.add("visible");
    });
    document.querySelector(".creatorInfo").addEventListener("mouseleave", function () {
        document.querySelector(".creatorInfoContent").classList.remove("visible");
    });

    //show & Hide "Website Created by Lara Dautun & Patrick Hutchinson
    if (mobile) {
        document.querySelector(".creatorInfo").addEventListener("click", function () {
            document.querySelector(".creatorInfoContent").classList.toggle("visible");
        });
        //        document.querySelector(".creatorInfo").addEventListener("mouseleave", function () {
        //            document.querySelector(".creatorInfoContent").style.visibility = "hidden";
        //        });
    }

    if (mobile) {
        //        document.querySelector(".keywordsList").style.left = document.querySelector("h3.keywords").getBoundingClientRect().left + "px";
        //        document.querySelector(".keywordsList").style.marginLeft = document.querySelector(".allList").clientWidth + "px";
        document.querySelector("h3.keywords").addEventListener("click", function () {
            //            document.querySelector("main").classList.toggle("blurred");
            document.querySelector(".keywordsList").classList.toggle("extended");
            document.querySelector(".closeTag").classList.toggle("visible");
        })

        document.querySelector("h3.keywords").innerHTML = "Filter by Keywords";

        document.querySelector(".closeTag").addEventListener("click", function () {
            if (document.querySelector(".keywordsList").classList.contains("extended")) {
                document.querySelector(".keywordsList").classList.remove("extended");
                this.classList.remove("visible");
            } else {
                document.querySelector(".keywordsList").classList.add("extended");
                this.classList.add("visible");
            }
        })
    }

    document.querySelectorAll(".thesisWrapper").forEach(function (thesisWrapper) {
        thesisWrapper.addEventListener("mouseenter", function () {
            thesisWrapper.classList.add("visible");
            //            if (!thesisWrapper.classList.contains("clickHighlighted")) {
            //                thesisWrapper.nextSibling.classList.add("isvisible");
            //            }
        })
        thesisWrapper.addEventListener("mouseleave", function () {
            thesisWrapper.classList.remove("visible");
            //            if (!thesisWrapper.classList.contains("clickHighlighted")) {
            //                thesisWrapper.nextSibling.classList.remove("isvisible");
            //            }
        })
    })




    //create an array which will be filled with the textcontents
    let thesisDescriptionArray = [];

    //function for inserting the (...) spans after each decriptiontext, used later
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    document.querySelectorAll(".thesisDescription").forEach(function (thesisDescriptionItem, thesisDescriptionItemindex, thesisDescriptionItemarray) {

        //fill the array
        thesisDescriptionArray.push(thesisDescriptionItem.textContent);

        //create the (...) spans
        let elipsisSpan = document.createElement("span");
        elipsisSpan.classList.add("elipsis")
        elipsisSpan.innerHTML = " (...)";
        insertAfter(thesisDescriptionItem.parentElement, elipsisSpan);


        document.querySelectorAll(".elipsis").forEach(function (elipsisItem, elipsisIndex, elipsisArray) {
            if (!mobile) {
                if (thesisDescriptionItem.innerHTML.split(" ").length > wordlimit - 1) {
                    thesisDescriptionItem.innerHTML = thesisDescriptionArray[thesisDescriptionItemindex].split(/\s+/).slice(0, wordlimit).join(" ");
                    //this selects the following a tag of the parent element "thesisDescription"; There is a way better way to do this but it works
                    thesisDescriptionItem.parentElement.nextElementSibling.style.display = "inline";
                } else {
                    thesisDescriptionItem.parentElement.nextElementSibling.style.display = "none";
                }
                window.addEventListener("resize", function () {
                    if (thesisDescriptionItem.innerHTML.split(" ").length !== wordlimit - 1) {
                        thesisDescriptionItem.innerHTML = thesisDescriptionArray[thesisDescriptionItemindex].split(/\s+/).slice(0, wordlimit).join(" ");
                        //this selects the following a tag of the parent element "thesisDescription"; There is a way better way to do this but it works
                        thesisDescriptionItem.parentElement.nextElementSibling.style.display = "inline";
                    } else {
                        thesisDescriptionItem.parentElement.nextElementSibling.style.display = "none";
                    }

                    let resizeTimer;
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(() => {
                        // Call your function here
                        if (thesisDescriptionItem.innerHTML.split(" ").length > wordlimit - 1) {
                            thesisDescriptionItem.innerHTML = thesisDescriptionArray[thesisDescriptionItemindex].split(/\s+/).slice(0, wordlimit).join(" ");
                            //this selects the following a tag of the parent element "thesisDescription"; There is a way better way to do this but it works
                            thesisDescriptionItem.parentElement.nextElementSibling.style.display = "inline";
                        } else {
                            thesisDescriptionItem.parentElement.nextElementSibling.style.display = "none";
                        }
                    }, 500); // Set a timeout of 500ms
                })

                elipsisItem.addEventListener("click", function () {
                    let clickedElipsis = event.target;
                    //change the textcontents of the preceding thesisDescriptionItem to the full text
                    //this selects the thesisDescriptionItem within the div previous of the a tag
                    clickedElipsis.previousElementSibling.lastChild.textContent = thesisDescriptionArray[elipsisIndex];
                    //hide the elipsisspan of the clicked item
                    clickedElipsis.style.display = "none";
                    clickedElipsis.previousElementSibling.classList.add("visible");

                    elipsisArray.forEach(function (el, elIndex, elArray) {
                        //for every elipsisitem that is not the one clicked
                        if (el !== event.target) {
                            //have all those return to the current worklimit
                            el.previousElementSibling.lastChild.textContent = thesisDescriptionArray[elIndex].split(/\s+/).slice(0, wordlimit).join(" ");

                            //if necessary, reshow the (...) span for elements previously expanded
                            if (el.previousSibling.innerHTML.split(" ").length > wordlimit - 1) {
                                el.style.display = "inline";
                                el.previousElementSibling.classList.remove("visible");
                            }

                            window.addEventListener("resize", function () {
                                el.previousElementSibling.lastChild.textContent = thesisDescriptionArray[elIndex].split(/\s+/).slice(0, wordlimit).join(" ");

                                //if necessary, reshow the (...) span for elements previously expanded
                                if (el.previousSibling.innerHTML.split(" ").length > wordlimit - 1) {
                                    el.style.display = "inline";
                                    el.previousElementSibling.classList.remove("visible");
                                }
                            })
                        }
                    })
                })

                elipsisItem.addEventListener("mouseenter", function () {
                    elipsisItem.previousElementSibling.classList.add("visible");
                })
                elipsisItem.addEventListener("mouseleave", function () {
                    elipsisItem.previousElementSibling.classList.remove("visible");
                })
            }

            if (mobile) {
                thesisDescriptionItem.innerHTML = "";

                elipsisItem.addEventListener("click", function () {
                    let clickedElipsis = event.target;
                    //change the textcontents of the preceding thesisDescriptionItem to the full text
                    //this selects the thesisDescriptionItem within the div previous of the a tag
                    clickedElipsis.previousElementSibling.lastChild.style.visibility = "hidden";
                    clickedElipsis.previousElementSibling.lastChild.style.opacity = "0";
                    clickedElipsis.previousElementSibling.lastChild.style.transition = "opacity 0.4s";
                    clickedElipsis.previousElementSibling.lastChild.textContent = thesisDescriptionArray[elipsisIndex];

                    //                    clickedElipsis.previousElementSibling.lastChild.style.transition = "0.6s";

                    setTimeout(() => {
                        clickedElipsis.previousElementSibling.lastChild.style.visibility = "visible";
                        clickedElipsis.previousElementSibling.lastChild.style.opacity = "1";
                    }, 400);
                    //hide the elipsisspan of the clicked item
                    clickedElipsis.style.display = "none";
                    clickedElipsis.previousElementSibling.classList.add("visible");

                    elipsisArray.forEach(function (el, elIndex, elArray) {
                        //for every elipsisitem that is not the one clicked
                        if (el !== event.target) {
                            //have all those return to the current worklimit
                            el.previousElementSibling.lastChild.textContent = "";

                            //if necessary, reshow the (...) span for elements previously expanded
                            el.style.display = "inline";
                            el.previousElementSibling.classList.remove("visible");
                        }
                    })
                })
            }
        });

    })

    if (mobile) {
        document.addEventListener("scroll", function () {
            if ((document.documentElement.scrollTop || document.body.scrollTop) > 20) {
                document.querySelector(".headerItem.mobile").classList.add("scaled");
            } else {
                document.querySelector(".headerItem.mobile").classList.remove("scaled");
            }

            document.querySelector(".headerItem.mobile").style.height = document.querySelector(".headerText").getBoundingClientRect().height + 10 + "px";

        })
    }

    //end of load function
})
