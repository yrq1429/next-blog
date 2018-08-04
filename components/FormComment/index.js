import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Layout, Menu, Breadcrumb, Row, Col, BackTop, Card, Form,
  Input, Tooltip, Cascader, Select, Checkbox, Button,
  AutoComplete, List, Avatar, Icon, Divider, message
} from 'antd';

import { regUrl, real_ip} from "../../until";
import {postComments, postUserComments,setCommentIndex} from "../../store/actions";
import {postCommentUrl, postUserCommentUrl} from "../../config";

const FormItem = Form.Item;
const {TextArea} = Input;
const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
    lg: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
    lg: {span: 16},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
    lg: {
      span: 16,
      offset: 8,
    },
  },
};
class FormComment extends Component {
  constructor(props) {
    super(props);
    this.state={
      autoCompleteResult: [],
    }
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({autoCompleteResult});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch, dataSource = {},answerId} = this.props;
    const {commentsData: commentsDataOrigin = [], articleID: id, isUserSubmit = false} = dataSource;
    if (!id && !isUserSubmit) {
      return;
    }
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {comment = '', email = '', nickname = '', website = ''} = values;
        if (website !== '' && !regUrl.test(website)) {
          message.warning('url不正确,示例："http://www.xxx.com"')
          return;
        }
        if (nickname.length < 2 || comment.length < 2) {
          message.warning('用户名或者评论内容过少')
          return;
        }

        const realIp = await real_ip()
        let queryParamsObj = {real_ip: realIp, ip: returnCitySN['cip'], address: returnCitySN['cname']};
        const isExist = commentsDataOrigin.findIndex(v => {
          const {user,name} = v;
          return ((user  || name) === nickname)&&((user  || name) !== '刘伟波');
        }) !== -1
        if (isExist) {
          message.warning('用户名已存在')
          return;
        }
        const queryStringComment = {
          id,
          comment: comment.trim(),
          email: email.trim(),
          nickname: nickname.trim(),
          website: website.trim(),
          name: nickname.trim(),
          answerId,
          ...queryParamsObj
        }
        //如果是详情页提交它，如果是关于我，则不用关心id
        isUserSubmit ?
          postUserComments(dispatch, postUserCommentUrl(), queryStringComment).then(res => {
            const {getUserCommentsData} = res;
            if (getUserCommentsData.length) {
              message.success(`留言发表成功`);
            }
          })
          :
          postComments(dispatch, postCommentUrl(), queryStringComment).then(res => {
            if (res) {
              message.success(`评论发表成功`);
            }
          })

        setCommentIndex(dispatch,-1)
      }
    });
  }
  render (){
    const {dataSource = {}} = this.props;
    const { commentPlaceHolder = '来吐槽', commentBtnMsg = '提交评论'} = dataSource;
    const {autoCompleteResult} = this.state;
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    const {getFieldDecorator} = this.props.form;
    return <Form onSubmit={this.handleSubmit}>
      <FormItem
        {...formItemLayout}
        label={(
          <span>
              Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('nickname', {
          rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
        })(
          <Input
            title="用户名"
            placeholder="用户名"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="E-mail"
      >
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
          }, {
            required: false, message: 'Please input your E-mail!',
          }],
        })(
          <Input
            title="不会被公开"
            placeholder="不会被公开"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="Website"
      >
        {getFieldDecorator('website', {
          rules: [{required: false, message: 'Please input website!'}],
        })(
          <AutoComplete
            dataSource={websiteOptions}
            onChange={this.handleWebsiteChange}
            placeholder='SEO推广 示例："http://xxx.com"'
          >
            <Input
              title='SEO推广 示例："http://xxx.com"'/>
          </AutoComplete>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="comment"
      >
        {getFieldDecorator('comment', {
          rules: [{
            required: true, message: 'Please input your comment!',
          }],
        })(
          <TextArea
            rows={6}
            title={commentPlaceHolder}
            placeholder={commentPlaceHolder}/>
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">{commentBtnMsg}</Button>
      </FormItem>
    </Form>

  }
}
const mapStateToProps = state => {
  const {answerId} = state;
  return {answerId};
}
const WrappedRegistrationForm = Form.create()(FormComment);
export default connect(mapStateToProps)(WrappedRegistrationForm);