import * as React from 'react'
// import ReactTags from './ReactTags'
// import suggestions  from './certifications'

const InputTags: React.FC = () => {
    const [tags, setTags] = React.useState<Array<string> | null>([])
    const [suggestions, setSuggestions] = React.useState
    return <div></div>
}

// type InputTagsState = {
//     tags: Array<string>
// }

//
//
// class InputTags extends React.Component<any,InputTagsState> {
//     constructor(props:any) {
//         super(props);
//
//         this.state = {
//             tags: []
//             //suggestions:any
//         };
//     }
//
//     handleDelete(i:any) {
//         const tags = this.state.tags.slice(0);
//         tags.splice(i, 1);
//         this.setState({ tags });
//     }
//
//     handleAddition(tag:any) {
//         const tags = [].concat(this.state.tags, tag);
//         this.setState({ tags });
//     }
//
//     render() {
//         return (
//             <React.Fragment>
//                 <ReactTags
//                     tags={this.state.tags}
//                     suggestions={suggestions}
//                     handleDelete={this.handleDelete.bind(this)}
//                     handleAddition={this.handleAddition.bind(this)
//                     }
//                 />
//             </React.Fragment>
//         );
//     }
// }
export default InputTags;