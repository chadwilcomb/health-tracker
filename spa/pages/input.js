import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import moment from 'moment'
import Day from '../models/day'

export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'InputPage',

    getInitialState () {
      const dateStr = moment().format('MM-DD-YYYY');
      const today = new Day({ date: dateStr });
      return {
        date: dateStr,
        today: today
      };
    },

    componentDidMount () {
      const _this = this;
      const {days} = this.props;
      const dateStr = moment().format('MM-DD-YYYY');
      days.getOrFetch(dateStr, function (err, day) {
        if (err) {
          console.error(err);
        }
        if (day) {
          if (!day._id) {
            days.add(day);
            day.save();
          }
          _this.setState({
            date: dateStr,
            today: day
          });
        }
      });
    },

    decrementDate () {
      const _this = this;
      const {days} = this.props;
      const {today} = this.state;
      const dateStr = moment(today.date,'MM-DD-YYYY').subtract(1, 'd').format('MM-DD-YYYY');
      days.getOrFetch(dateStr, function (err, day) {
        if (err) {
          console.error(err);
        }
        if (day) {
          if (!day._id) {
            days.add(day);
            day.save();
          }
          _this.setState({
            date: dateStr,
            today: day
          });
        }
      });
    },

    incrementDate () {
      const _this = this;
      const {days} = this.props;
      const {today} = this.state;
      const dateStr = moment(today.date,'MM-DD-YYYY').add(1, 'd').format('MM-DD-YYYY');
      days.getOrFetch(dateStr, function (err, day) {
        if (err) {
          console.error(err);
        }
        if (day) {
          if (!day._id) {
            days.add(day);
            day.save();
          }
          _this.setState({
            date: dateStr,
            today: day
          });
        }
      });
    },

    decrementMiles () {
      const {today} = this.state;
      today.miles = today.miles >= 0.5 ? today.miles - 0.5 : 0;
      today.save();
      this.setState({ today: today })
    },

    incrementMiles () {
      const {today} = this.state;
      today.miles = today.miles + 0.5;
      today.save();
      this.setState({ today: today })
    },

    decrementDrinks () {
      const {today} = this.state;
      today.drinks = today.drinks >= 1 ? today.drinks - 1 : 0;
      today.save();
      this.setState({ today: today })
    },

    incrementDrinks () {
      const {today} = this.state;
      today.drinks = today.drinks + 1;
      today.save();
      this.setState({ today: today })
    },

    render () {
        const {days} = this.props;
        const {today} = this.state;
        const summary = days.getSummaryCurrentYear();
        return (
          <div className='day-view'>
            <div className='row'>
              <div className='col-xs-12 col-md-4 col-md-offset-4'>
                <div className='card card-block center'>
                  <h4 className="card-title">Date</h4>
                  <div className='card-text'>
                    <span className='increment-btn' onClick={this.decrementDate}><i className='fa fa-minus'></i></span>
                    <span className='day-value date'>{today.date}</span>
                    <span className='increment-btn' onClick={this.incrementDate}><i className='fa fa-plus'></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-4 col-md-offset-4'>
                <div className='card card-block center'>
                  <h4 className="card-title">Miles</h4>
                  <div className='card-text'>
                    <ul className='day-controls'>
                      <li className='increment-btn' onClick={this.decrementMiles}><i className='fa fa-minus'></i></li>
                      <li className='day-value miles'>{today.miles}</li>
                      <li className='increment-btn' onClick={this.incrementMiles}><i className='fa fa-plus'></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-4 col-md-offset-4'>
                <div className='card card-block center'>
                  <h4 className="card-title">Drinks</h4>
                  <div className='card-text'>
                    <ul className='day-controls'>
                      <li className='increment-btn' onClick={this.decrementDrinks}><i className='fa fa-minus'></i></li>
                      <li className='day-value drinks'>{today.drinks}</li>
                      <li className='increment-btn' onClick={this.incrementDrinks}><i className='fa fa-plus'></i></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-4 col-md-offset-4'>
                <div className='card card-block center'>
                  <div className='row'>
                    <div className='col-xs-4'>
                      <div className='summary-title-sm'>Miles</div>
                      <div className='summary-value-sm'>{summary.miles}</div>
                    </div>
                    <div className='col-xs-4'>
                      <h4 className='summary-title-lg'>Score</h4>
                      <h1 className='summary-value-lg'>{summary.score}</h1>
                    </div>
                    <div className='col-xs-4'>
                      <div className='summary-title-sm'>Drinks</div>
                      <div className='summary-value-sm'>{summary.drinks}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
});
