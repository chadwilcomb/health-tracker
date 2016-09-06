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
      const maxDate = moment(new Date());
      const nextDate = moment(today.date,'MM-DD-YYYY').add(1, 'd');
      if (nextDate.isSameOrBefore(maxDate)) {
        days.getOrFetch(nextDate.format('MM-DD-YYYY'), function (err, day) {
          if (err) {
            console.error(err);
          }
          if (day) {
            if (!day._id) {
              days.add(day);
              day.save();
            }
            _this.setState({
              date: nextDate.format('MM-DD-YYYY'),
              today: day
            });
          }
        });
      }
    },

    decrementMiles () {
      this.updateValue('miles', -1);
    },

    incrementMiles () {
      this.updateValue('miles', 1);

    },

    decrementDrinks () {
      this.updateValue('drinks', -1);
    },

    incrementDrinks () {
      this.updateValue('drinks', 1);
    },

    updateValue(prop, value) {
      const {today} = this.state;
      today[prop] = today[prop] + value;
      if (today[prop] < 0) today[prop] = 0;
      today.save();
      this.setState({ today: today });
    },

    render () {
        const {days} = this.props;
        const {today} = this.state;
        const summary = days.getSummaryCurrentYear();
        const maxDate = moment(new Date());
        const nextDate = moment(today.date,'MM-DD-YYYY').add(1, 'd');
        const showIncrementDate = nextDate.isSameOrBefore(maxDate);
        let incrementDate;
        if (showIncrementDate) {
          incrementDate = (
            <button type='button' className='btn btn-primary' onClick={this.incrementDate}><i className='fa fa-plus'></i></button>
          )
        } else {
          incrementDate = (
            <button type='button' className='btn btn-primary disabled' disabled><i className='fa fa-plus'></i></button>
          )
        }
        return (
          <div className='day-view'>
            <div className='row'>
              <div className='col-xs-12 col-md-6 col-md-offset-3'>
                <div className='btn-row row'>
                  <div className='btn-section col-xs-3'>
                    <button type='button' className='btn btn-primary' onClick={this.decrementDate}><i className='fa fa-minus'></i></button>
                  </div>
                  <div className='btn-section col-xs-6'>
                    <div className='title'>Date</div>
                    <div className='value'>{today.date}</div>
                  </div>
                  <div className='btn-section col-xs-3'>{incrementDate}</div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-6 col-md-offset-3'>
                <div className='btn-row row'>
                  <div className='btn-section col-xs-3'>
                    <button type='button' className='btn btn-primary' onClick={this.decrementMiles}><i className='fa fa-minus'></i></button>
                  </div>
                  <div className='btn-section col-xs-6'>
                    <div className='title'>Miles</div>
                    <div className='value'>{today.miles}</div>
                  </div>
                  <div className='btn-section col-xs-3'>
                    <button type='button' className='btn btn-primary' onClick={this.incrementMiles}><i className='fa fa-plus'></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-6 col-md-offset-3'>
                <div className='btn-row row'>
                  <div className='btn-section col-xs-3'>
                    <button type='button' className='btn btn-primary' onClick={this.decrementDrinks}><i className='fa fa-minus'></i></button>
                  </div>
                  <div className='btn-section col-xs-6'>
                    <div className='title'>Drinks</div>
                    <div className='value'>{today.drinks}</div>
                  </div>
                  <div className='btn-section col-xs-3'>
                    <button type='button' className='btn btn-primary' onClick={this.incrementDrinks}><i className='fa fa-plus'></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-md-6 col-md-offset-3'>
                <div className='btn-row row'>
                  <div className='btn-section col-xs-4'>
                    <div className='title'>Miles</div>
                    <div className='value'>{summary.miles}</div>
                  </div>
                  <div className='btn-section col-xs-4'>
                    <div className='title'>Score</div>
                    <div className='summary value'>{summary.score}</div>
                  </div>
                  <div className='btn-section col-xs-4'>
                    <div className='title'>Drinks</div>
                    <div className='value'>{summary.drinks}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
});
