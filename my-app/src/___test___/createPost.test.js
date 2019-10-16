import React from 'react';
import CreatePostComponent from '../components/post/CreatePost';
import { Provider } from "react-redux";
import renderer, { create} from 'react-test-renderer';
import { createStore } from 'redux';
import { reducers } from '../redux/store';

// enzyme 及 render Component 的 method : shallow
import Enzyme, { shallow, mount  } from 'enzyme'; 
// 將對應 React 版本的解析器導入
import Adapter from 'enzyme-adapter-react-16';

// 以該解析器提供給 Enzyme 做渲染 Component 的設置
Enzyme.configure({ adapter: new Adapter() });


//snapshot test
it('renders correctly', () => {
    let store = createStore(reducers);
    const tree = renderer
        .create( 
        <Provider store={store}>
            <CreatePostComponent />   
        </Provider>
        )
            .toJSON(); expect(tree).toMatchSnapshot();
        });

//使用Enzyme test 
let store = createStore(reducers);
let wrapper;
beforeEach(() => {
     wrapper = mount(
        <Provider store={store}>
            <CreatePostComponent/>   
        </Provider>);
});



describe('<CreatePostComponent> rendering', () => {
     it('should render a <p> to display the number of the post types', () => {
        expect(wrapper.find('p')).toHaveLength(5);
     });
})
