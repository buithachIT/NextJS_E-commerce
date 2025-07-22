// External Dependencies
import React, { Component } from 'react';

class BRWWL_brands_list extends Component {

  static slug = 'et_pb_brands_list_2';
  static parameters = ['use_name',
            'img_display',
            'img_display',
            'img_width',
            'img_width_units',
            'img_height',
            'img_height_units',
            'img_fit',
            'img_align',
            'orderby',
            'order',
            'count',
            'hide_empty',
            'out_of_stock',
            'featured_first',
            'slider',
            'show_all',
            'category_only',
            'hierarchy',
            'brl-brands_include',
            'per_row',
            'brands_number',
            'padding',
            'margin',
            'border_width',
            'border_color',];
  constructor(props) {
    super(props);
    this.htmlstate = <div></div>;
    this.state = {
      error: null,
      isLoaded: false
    };
  }
  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return (<div>{error.message}</div>);
    } else if (!isLoaded) {
      return (<div style={{height:"100px"}}><div class="et-fb-loader-wrapper"><div class="et-fb-loader"></div></div></div>);
    } else {
      return this.htmlstate;
    }
  }

  componentDidUpdate(oldProps) {
      var update = false;
      BRWWL_brands_list.parameters.forEach(key => {
          if( oldProps[key] != this.props[key] ) {
              update = true;
          }
      });
      if( update ) {
          console.log(this.props);
        this.setState({
          error: null,
          isLoaded: false
        });
        this.componentDidMount();
      }
  }
  componentDidMount() {
    var body = new FormData();
    body.append('action', 'brbrand_brands_list');
    var newProps = this.props;
    Object.keys(newProps).forEach(key => {
      body.append(key, newProps[key]);
    });
    
    fetch(
      window.et_fb_options.ajaxurl, 
      {
        body: body,
        method: 'POST',        
      }
    )
      .then(res => res.text())
      .then(
        (result) => {
          if( typeof(result) === 'undefined' || ! result ) {
              this.htmlstate = (<div style={{padding:"2em 0", background: "#6c2eb9", color: "#fff", fontSize: "12px", fontWeight: "600", verticalAlign: "middle", textAlign: "center", borderRadius: "1em"}}><h3 style={{color: "#000", textShadow: "1px 0px white, -1px 0px white, 0px 1px white, 0px -1px white", fontWeight: "900"}}>Single Filter</h3>Filters not displayed in Builder</div>);
              this.setState({
                isLoaded: true
              });
          } else {
              const brevent = new Event('br_update_et_pb_brands_list');
              window.dispatchEvent(brevent);
              this.htmlstate = (<div dangerouslySetInnerHTML={{__html: result}} />);
              this.setState({
                isLoaded: true
              });
          }
        },
        (error) => {
          this.htmlstate = (<div style={{padding:"2em 0", background: "#6c2eb9", color: "#fff", fontSize: "12px", fontWeight: "600", verticalAlign: "middle", textAlign: "center", borderRadius: "1em"}}><h3 style={{color: "#000", textShadow: "1px 0px white, -1px 0px white, 0px 1px white, 0px -1px white", fontWeight: "900"}}>Single Filter</h3>Filters not displayed in Builder</div>);
          this.setState({
            isLoaded: true
          });
        }
      )
  }
}

export default BRWWL_brands_list;
