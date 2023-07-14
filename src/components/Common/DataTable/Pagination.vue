<template>
  <div class="mb-0">
    <div class="VuePagination">
      <ul v-show="totalPages >= 1" class="pagination VuePagination__pagination">
        <li
          class="
            VuePagination__pagination-item
            page-item
            VuePagination__pagination-item-prev-page
            page-prev
          "
          :class="{ disabled: !allowedPage(page - 1) }"
        >
          <a :style="opacityFirstItem()" href="javascript:void(0);" @click="prev()">
            <font-awesome-icon icon="fa-solid fa-backward-step" />
          </a>
        </li>

        <template v-for="(item, key) in pages" :key="key">
          <li
            v-if="isDisplayedItem(item)"
            class="VuePagination__pagination-item page-item"
            :class="{ active: parseInt(page) === parseInt(item) }"
          >
            <a
              v-if="!isDotsItem(item)"
              class="page-link"
              role="button"
              @click="setPage(item)"
              >{{ item }}</a
            >
            <span v-else class="three-dots">...</span>
          </li>
        </template>

        <li
        class="VuePagination__pagination-item page-item VuePagination__pagination-item-next-page page-next"
          :class="{ disabled: !allowedPage(page + 1) }"
        >
          <a :style="opacityLastItem()" href="javascript:void(0);" @click="next()">
            <font-awesome-icon icon="fa-solid fa-forward-step" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // page: 1,
    }
  },
  computed: {
    page: {
      // getter
      get() {
        if(!this.currentPage){
          return 1
        }
        return this.currentPage
      },
      // setter
      set(newValue) {
        return newValue
      }
    },
    pages() {
      if (!this.records) {
        return []
      }

      return range(1, this.totalPages)
    },
    totalPages() {
      return this.records ? Math.ceil(this.records / this.perPage) : 1
    },
  },
  watch: {
    perPage() {
      this.page = 1
    }
  },
  methods: {
    setPage(page) {
      if (this.allowedPage(page)) {
        this.paginate(page)
      }
    },
    paginate(page) {
      this.page = page
      this.$emit('pagination:page', page)
    },
    next() {
      return this.setPage(this.page + 1)
    },
    prev() {
      return this.setPage(this.page - 1)
    },
    allowedPage(page) {
      return page >= 1 && page <= this.totalPages
    },
    allowedPageClass(direction) {
      return this.allowedPage(direction) ? '' : 'disabled'
    },
    activeClass(page) {
      return parseInt(this.page) === parseInt(page) ? 'active' : ''
    },

    isDisplayedItem(item) {
      const currentPage = this.page
      if (
        this.totalPages <= 9 ||
        item == 1 ||
        item == this.totalPages ||
        (item >= currentPage - 3 && item <= currentPage + 3)
      ) {
        return true
      }
    },
    isDotsItem(item) {
      const currentPage = this.page
      if (item == 1 || item == this.totalPages || this.totalPages <= 9) {
        return false
      }
      if (item == currentPage - 3 || item == currentPage + 3) {
        return true
      }
      return false
    },
    opacityFirstItem() {
      if (this.page == 1) {
        return ['opacity: 0.5;', 'pointer-events: none;']
      }
    },
    opacityLastItem() {
      if (this.page == this.totalPages) {
        return ['opacity: 0.5;', 'pointer-events: none;']
      }
    },
    setCurrentPage(page) {
      if (this.allowedPage(page)) {
        this.page = page
      }else{
        this.page = this.totalPages
      }
    },
  },
}

function range(start, total) {
  const end = total
  return Array.apply(0, Array(end)).map(function (_, index) {
    return index + start
  })
}
</script>

<style lang="scss" scoped>
.VuePagination {
  height: 30px;
}
.VuePagination .pagination {
  padding-bottom: 10px;
}
.page-item {
  &.active {
    a {
      background-color: var(--color-primary) !important;
      color: white !important;
    }
  }
  a {
    position: relative;
    float: left;
    padding: 5px 12px;
    width: auto;
    line-height: 1.6;
    text-decoration: none;
    color: black;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: -1px;
    border-radius: 4px;
    margin-right: 2px;
    font-size: 13px;
    height: 31px;
  }
  a img {
    transition: all 0.3s ease;
    opacity: 1;
    margin-top: 4px;
    width: 12px;
  }
  &:last-child {
    a {
      margin-right: 0px;
    }
  }
}
.page-prev {
  a {
    transform: scale(0.9, 1);
  }
}
.page-next {
  a {
    transform: scale(0.9, 1);
  }
}
.three-dots {
  line-height: 31px;
  padding-right: 10px;
}
</style>
