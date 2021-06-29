import { fill_form } from "./form_utils";

const no_values_submitted = {
    description: null,
    version: null,
    tags: null,
    click_diagram: null,
    click_submit: true
}



const description_submitted = {
    description: "company 1",
    version: null,
    tags: null,
    click_diagram: null,
    click_submit: true
}



const tag_submitted = {
    description: null,
    version: null,
    tags: "tag 1",
    click_diagram: null,
    click_submit: true
}



const description_tag_submitted = {
    description: "company 2",
    version: "standard",
    tags: "tag1 , tag 2, tag 3",
    click_diagram: null,
    click_submit: true
}

const upload_diagram = {
    description: "company 2",
    version: null,
    tags: "tag1 , tag 2, tag 3",
    click_diagram: true,
    click_submit: true
}
// node -r esm app.js

fill_form(upload_diagram)

