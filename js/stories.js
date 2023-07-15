"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let $li = $(`
      <li id="${story.storyId}">
        <span class = "star">star</span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);


  let $star = $(".star");
  $star.on("click", addOrRemoveFavorite);

  function addOrRemoveFavorite(evt) {
    console.log("Event target is", evt.target);
    const $eventTargetColor = $(evt.target).css("background-color");
    console.log("Event target is", $eventTargetColor);
    if ($eventTargetColor === "rgb(127, 255, 212)") {
      //addFavorite()
      let $selectedLi = $(evt.target).parent();
      console.log("parent of star", $selectedLi);
      let selectedStoryId = $selectedLi.attr("id");
      console.log("selectedStoryId", selectedStoryId);
      currentUser.addFavorite();
      storyList.stories[idx];
      for (let story of storyList.stories) {

      }

    }
  }

  return $li;


}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


/**Get the data from user input, and put the new story on the page */
async function getStoryDataFromForm(evt) {
  //obj of {title, author, url}
  evt.preventDefault();
  console.log("get story data from from");
  const author = $("#author").val();
  const title = $("#title").val();
  const url = $("#url").val();
  const newStoryInput = { author, title, url };
  console.debug("newStoryInput", newStoryInput);
  await storyList.addStory(currentUser, newStoryInput);
  putStoriesOnPage();
}

let $star = $(".star");
$star.on("click", function () {
  $star.toggleClass("favorite");
  console.log("star", $star);
})






